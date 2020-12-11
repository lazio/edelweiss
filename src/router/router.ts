import { render } from '../dom/render';
import { setIsRouteChangedMarker } from './markers';
import { isMatched, extractParameters } from './utils';
import { isNothing, maybe, SomePartial } from '@fluss/core';

export type Route = {
  readonly path: string;
  readonly container: string;
  readonly parameters: RegExpMatchArray;
  before?: () => void | boolean | Promise<void | boolean>;
  view: () => string;
  after?: () => Promise<void> | void;
};

type RouterOptions = {
  /**
   * Container for elements from all routes.
   * If all routes will have the same container, then this variable may be set and used.
   */
  container: string;
};

/** Store global options for router namespace. */
const _routerGlobalOptions: RouterOptions = {
  container: '',
};

/** Renders if there is no route that match path. */
const _DEFAULT_ROUTE: Route = {
  path: '.+',
  container: 'body',
  parameters: [],
  view(): string {
    return (
      '<b>There is no route that match ' +
      `"${window.location.pathname}" path. ` +
      'Did you forget to call <strong>router.add(...)</strong> function?</b>'
    );
  },
};

/** Holds all routes that user pass to "router.add()". */
const _routes: Array<Route> = [];

/** Holds current route. */
export let current: Route = _DEFAULT_ROUTE;

/**
 * Set global options for router.
 * Must be called before all `router.add`.
 */
export function configure({ container }: Partial<RouterOptions>): void {
  _routerGlobalOptions.container = container ?? '';
}

export function add(
  ...routes: ReadonlyArray<SomePartial<Route, 'parameters' | 'container'>>
): void {
  routes.forEach((route) =>
    _routes.push({
      ...route,
      container: route.container ?? _routerGlobalOptions.container,
      parameters: [],
    })
  );
}

export async function to(
  path: string,
  options: {
    /**
     * Determine whether navigating to route must update "window.history" or not.
     * By default this method updates "window.history".
     */
    willStateChange?: boolean;
  } = {}
): Promise<void> {
  await navigate(path, findRoute(path), options.willStateChange);
}

export async function reload(): Promise<void> {
  await navigate(window.location.pathname, current, false);
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

function findRoute(pathname: string): Route {
  return (
    maybe(_routes.find(({ path }) => isMatched(pathname, path)))
      .map((route) => ({
        ...route,
        // Parameters need to be updated to hold current path
        // variables if there is any.
        parameters: extractParameters(pathname, route.path),
      }))
      .extract() ?? _DEFAULT_ROUTE
  );
}

/** Navigates to _path_. */
async function navigate(
  path: string,
  route: Route,
  willStateChange: boolean = true
): Promise<void> {
  setIsRouteChangedMarker(current.path !== route.path);

  // Before route render hook
  if (!isNothing(route.before)) {
    if ((await Promise.resolve(route.before())) === false) {
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
        path,
        container: route.container,
      },
      '',
      path
    );
  }

  render(route.container, route.view());

  // After route render hook
  if (!isNothing(route.after)) {
    await Promise.resolve(route.after());
  }

  setIsRouteChangedMarker(false);
}
