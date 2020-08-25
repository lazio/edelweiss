import { warn } from '../utils/warn';
import { render } from '../render';
import { querySelector, addEventListener } from '@fluss/web';
import {
  maybeOf,
  isArray,
  forEach,
  resolve,
  isNothing,
  arrayFrom,
} from '@fluss/core';
import type Component from '../component/component';

export type RouteInfo = {
  parameters?: RegExpMatchArray | null;
};

export type Route = {
  path: string | RegExp;
  container?: string;
  before?: () => Promise<void>;
  view: () =>
    | string
    | Component
    | Promise<string>
    | (string | Component | Promise<string>)[];
  after?: () => Promise<void>;
};

/**
 * Holds all routes that user pass to "Router.add()".
 */
const _routes: Map<string | RegExp, Route> = new Map();
/**
 * Holds current route.
 */
let _current: Route & RouteInfo = {
  path: '',
  container: '',
  view() {
    return '';
  },
};
/**
 * Container for elements from all routes.
 * If all routes will have the same container, then this variable may be set and used.
 */
let _pageContainer: string = '';

export default class Router {
  static get current() {
    return _current;
  }

  static get container(): string {
    return _pageContainer;
  }

  static set container(value: string) {
    _pageContainer = value;
  }

  static add(routes: Route | Route[]): void {
    isArray(routes)
      ? forEach(routes, (route) => _routes.set(route.path, route))
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
    if (_routes.size === 0) {
      warn(`You cannot navigate to ${path} because you didn't define any routes!
      At first call "Router.add(...)".`);
      return resolve();
    }

    let routeFound: Promise<void> | null | undefined;

    forEach(arrayFrom(_routes.entries()), ([key, route]) => {
      const pathRegExp =
        typeof key === 'string' ? new RegExp(regexpifyString(key)) : key;

      if (pathRegExp.test(path)) {
        routeFound = maybeOf(route.container || _pageContainer)
          .chain((container) => {
            return querySelector(container).map(async () => {
              _current = {
                ...route,
                /**
                 * If match exists in path, then result is array, where first item is
                 * the whole matched string.
                 * If parameters exist in path (they must be surrounded by brackets), then
                 * second item and go on to end of array are parameters.
                 *
                 * For more info: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
                 */
                parameters: pathRegExp.exec(path),
              };

              // Before route render hook
              if (!isNothing(route.before)) {
                await route.before();
              }

              await render(container, route.view());

              if (
                isNothing(options.willStateChange) ||
                options.willStateChange
              ) {
                window.history.pushState({ path, container }, '', path);
              }

              // After route render hook
              if (!isNothing(route.after)) {
                await route.after();
              }
            });
          })
          .extract();
      }
    });

    if (isNothing(routeFound)) {
      warn(`No route is specified for path: ${path}!`);
      return resolve();
    } else {
      return routeFound;
    }
  }

  static reload(): Promise<void> {
    const { container, view } = _current;
    return maybeOf(container || _pageContainer)
      .map((currentContainer) => render(currentContainer, view()))
      .extract();
  }

  static back() {
    window.history.back();
  }

  static forward() {
    window.history.forward();
  }
}

/**
 * Triggering navigating via browser's buttons and "Router.back()", "Router.forward()".
 */
addEventListener(
  window,
  'popstate',
  (event: { state: { path: string; container: string } }) => {
    Router.to(event.state.path, { willStateChange: false });
  }
);

function regexpifyString(regexp: string): string {
  let normalizedRegExp = regexp;

  if (/[^\\]\//g.test(regexp)) {
    normalizedRegExp = normalizedRegExp.split('/').join('\\/');
  }
  if (!normalizedRegExp.startsWith('^')) {
    normalizedRegExp = `^${normalizedRegExp}`;
  }
  if (!normalizedRegExp.endsWith('$')) {
    normalizedRegExp = `${normalizedRegExp}$`;
  }

  return normalizedRegExp;
}
