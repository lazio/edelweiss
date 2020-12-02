import { render } from '../dom/render';
import { setIsRouteChangedMarker } from './markers';
import { promiseOf, isNothing, maybeOf } from '@fluss/core';
import { isMatched, extractParameters, prependPathPrefix } from './utils';
import type { SomePartial } from '../utils/types';

export type Route = {
  readonly path: string;
  readonly container: string;
  readonly parameters: RegExpMatchArray;
  before?: () => void | boolean | Promise<void | boolean>;
  view: () => string;
  after?: () => Promise<void> | void;
};

type RouterOptions = {
  /** Prefix path that will be prepended to path of all user's defined routes. */
  prefix: string;
  /**
   * Container for elements from all routes.
   * If all routes will have the same container, then this variable may be set and used.
   */
  container: string;
};

/** Store global options for router namespace. */
const _routerGlobalOptions: RouterOptions = {
  prefix: '',
  container: '',
};

/** Renders if there is no route that match path. */
const DEFAULT_ROUTE: Route = {
  path: '/no-route-found',
  container: 'body',
  parameters: [],
  view(): string {
    return `<b>There is no route that match "${window.location.pathname}" path.</b>`;
  },
};

/** Holds all routes that user pass to "router.add()". */
const _routes: Array<Route> = [];

/** Holds current route. */
export let current: Route = DEFAULT_ROUTE;

/**
 * Set global options for router.
 * Must be called before all `router.add`.
 */
export function configure({ prefix, container }: Partial<RouterOptions>): void {
  _routerGlobalOptions.prefix = prefix ?? '';
  _routerGlobalOptions.container = container ?? '';
}

export function add(
  ...routes: ReadonlyArray<SomePartial<Route, 'parameters' | 'container'>>
): void {
  routes.forEach((route) =>
    _routes.push({
      ...route,
      path: prependPathPrefix(_routerGlobalOptions.prefix, route.path),
      container: route.container ?? _routerGlobalOptions.container,
      parameters: [],
    })
  );
}

export function to(
  path: string,
  options: {
    /**
     * Determine whether navigating to route must update "window.history" or not.
     * By default this method updates "window.history".
     */
    willStateChange?: boolean;
  } = {}
): Promise<void> {
  const pathWithPrefix = prependPathPrefix(_routerGlobalOptions.prefix, path);

  if (_routes.length === 0) {
    console.warn(`You cannot navigate to ${pathWithPrefix} because you didn't define any routes!
    At first call "router.add(...)".`);
    return promiseOf(undefined);
  }

  return navigate(
    pathWithPrefix,
    findRoute(pathWithPrefix),
    options.willStateChange
  );
}

export async function reload(): Promise<void> {
  const { container, view, after, before } = current;

  // Before route render hook
  if (!isNothing(before)) {
    await promiseOf(before());
  }

  render(container, view());

  // After route render hook
  if (!isNothing(after)) {
    await promiseOf(after());
  }
}

export function back(): void {
  window.history.back();
}

export function forward(): void {
  window.history.forward();
}

/**
 * Triggering navigating via browser's buttons, "router.back()", "router.forward()",
 * but not via elements that changes url without setting "state"
 * (default behavior of <a> etc.).
 */
window.addEventListener('popstate', (event) => {
  if (!isNothing(event.state)) {
    to(event.state.path, { willStateChange: false });
  }
});

function findRoute(pathWithPrefix: string): Route {
  return (
    maybeOf(_routes.find(({ path }) => isMatched(pathWithPrefix, path)))
      .map((route) => ({
        ...route,
        // Parameters need to be updated to hold current path
        // variables if there is any.
        parameters: extractParameters(pathWithPrefix, route.path),
      }))
      .extract() ?? DEFAULT_ROUTE
  );
}

/** Navigates to _pathWithPrefix_. */
async function navigate(
  pathWithPrefix: string,
  route: Route,
  willStateChange: boolean = true
): Promise<void> {
  setIsRouteChangedMarker(current.path !== route.path);

  // Before route render hook
  if (!isNothing(route.before)) {
    if ((await promiseOf(route.before())) === false) {
      /**
       * Navigating to route can be prevented by
       * returning `false` from `route.before` function.
       * Also we must reset route changed marker.
       */
      return setIsRouteChangedMarker(false);
    }
  }

  current = route;

  if (willStateChange) {
    window.history.pushState(
      {
        path: pathWithPrefix,
        container: route.container,
      },
      '',
      pathWithPrefix
    );
  }

  render(route.container, route.view());

  // After route render hook
  if (!isNothing(route.after)) {
    await promiseOf(route.after());
  }

  setIsRouteChangedMarker(false);
}
