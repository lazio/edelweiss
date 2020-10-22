import { warn } from '../utils/warn';
import { render } from '../dom/render';
import { matchPath } from './path_to_regexp';
import { addEventListener } from '@fluss/web';
import { promiseOf, isNothing, arrayFrom } from '@fluss/core';
import type Component from '../component/component';

export type Route = {
  readonly path: string;
  readonly container?: string;
  readonly parameters?: RegExpMatchArray;
  before?: () => Promise<void> | void;
  view: () =>
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>;
  after?: () => Promise<void> | void;
};

/**
 * Holds all routes that user pass to "Router.add()".
 */
const _routes: Map<string, Route> = new Map();
/**
 * Holds current route.
 */
export let _current: Route = {
  path: '',
  container: '',
  view() {
    return '';
  },
};

/**
 * Need for distinguish between diffing elements inside one page and
 * between two different pages.
 */
export let _isRouteChanged: boolean = false;

type RouterOptions = {
  /** Prefix path that will be prepended to path of all user's defined routes. */
  basePrefix: string;
  /**
   * Container for elements from all routes.
   * If all routes will have the same container, then this variable may be set and used.
   */
  baseContainer: string;
};

export const _routerGlobalOptions: RouterOptions = {
  basePrefix: '',
  baseContainer: '',
};

export default class Router {
  static get current() {
    return _current;
  }

  static configure(options: Partial<RouterOptions>): void {
    const { basePrefix, baseContainer } = options;

    if (!isNothing(basePrefix)) {
      _routerGlobalOptions.basePrefix = basePrefix;
    }

    if (!isNothing(baseContainer)) {
      _routerGlobalOptions.baseContainer = baseContainer;
    }
  }

  static add(routes: Route | Array<Route>): void {
    Array.isArray(routes)
      ? routes.forEach((route) => _routes.set(route.path, route))
      : _routes.set(routes.path, routes);
  }

  static to(
    path: string,
    options: {
      /**
       * Determine whether navigating to route must update "window.history" or not.
       * By default this method updates "window.history".
       */
      willStateChange?: boolean;
    } = {}
  ): Promise<void> {
    const pathWithPrefix = prependPathPrefix(path);

    if (_routes.size === 0) {
      warn(`You cannot navigate to ${pathWithPrefix} because you didn't define any routes!
      At first call "Router.add(...)".`);
      return promiseOf(undefined);
    }

    let routeFound: Promise<void> | null | undefined;

    arrayFrom(_routes.entries()).forEach(([key, route]) => {
      const pathMatch = matchPath(pathWithPrefix, prependPathPrefix(key));

      if (pathMatch.isJust()) {
        const container = route.container || _routerGlobalOptions.baseContainer;

        routeFound = pathMatch
          .map(async (parameters) => {
            _isRouteChanged = _current.path !== route.path;

            _current = {
              ...route,
              /**
               * If match exists in path, then result is array, where first item is
               * the whole matched string.
               * If parameters exist in path (they must be surrounded by brackets), then
               * second item and go on to end of array are parameters.
               */
              parameters,
            };

            // Before route render hook
            if (!isNothing(route.before)) {
              await promiseOf(route.before());
            }

            await render(container, route.view());

            if (isNothing(options.willStateChange) || options.willStateChange) {
              window.history.pushState(
                { path: pathWithPrefix, container },
                '',
                pathWithPrefix
              );
            }

            // After route render hook
            if (!isNothing(route.after)) {
              await promiseOf(route.after());
            }

            _isRouteChanged = false;
          })
          .extract();
      }
    });

    return isNothing(routeFound)
      ? promiseOf(warn(`No route is specified for path: ${pathWithPrefix}!`))
      : routeFound;
  }

  static async reload(): Promise<void> {
    const { container, view, after, before } = _current;

    // Before route render hook
    if (!isNothing(before)) {
      await promiseOf(before());
    }

    await render(container || _routerGlobalOptions.baseContainer, view());

    // After route render hook
    if (!isNothing(after)) {
      await promiseOf(after());
    }
  }

  static back() {
    window.history.back();
  }

  static forward() {
    window.history.forward();
  }
}

/**
 * Triggering navigating via browser's buttons, "Router.back()", "Router.forward()",
 * but not via elements that changes url without setting "state"
 * (default behavior of <a> etc.).
 */
addEventListener(window, 'popstate', (event) => {
  if (!isNothing(event.state)) {
    Router.to(event.state.path, { willStateChange: false });
  }
});

function prependPathPrefix(path: string): string {
  return path.startsWith(_routerGlobalOptions.basePrefix)
    ? path
    : _routerGlobalOptions.basePrefix + path;
}
