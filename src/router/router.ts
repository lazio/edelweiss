import { render } from '../dom/render';
import { setIsRouteChangedMarker } from './markers';
import { isMatched, extractParameters } from './utils';

export type Route = {
  /**
   * Path of the route. It will be implicitly converted to `RegExp`,
   * so you must write valid RegExp in string.
   *
   * Variables will be available in _parameters_ field.
   */
  readonly path: string;
  /**
   * Selector of root element that will hold HTML of this route.
   * If local container property is absent, then global one will
   * be used.
   */
  readonly container: string;
  /**
   * Holds variables (capture groups) that are defined inside _path_.
   * First value of array is whole matched string.
   * Second value (index **1**) and go on are path's variables.
   */
  readonly parameters: RegExpMatchArray;
  /**
   * Hook is invoked before this route will render.
   *
   * For preventing navigation to route return `false`
   * from method.
   */
  before?: () => void | boolean | Promise<void | boolean>;
  /** Returns HTML template for this route. */
  view: () => string;
  /** Hook is invoked after this route renders. */
  after?: () => Promise<void> | void;
};

type RouterOptions = {
  /**
   * Global container selector of root node of application.
   * If most routes will have the same container,
   * then this variable may be set.
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

/** Returns info about current route. */
export let current: Route = _DEFAULT_ROUTE;

/**
 * Define settings for `router`.
 * Must be called before all `route.add` functions.
 */
export function configure({ container }: Partial<RouterOptions>): void {
  _routerGlobalOptions.container = container ?? '';
}

/**
 * Same as `Route` type, but does not contain _parameters_
 * property and _container_ property is optional.
 *
 * @see Route
 */
type UserRoute = Omit<
  Omit<Route, 'container'> & Partial<Pick<Route, 'container'>>,
  'parameters'
>;

/** Makes routes known for `router`.  */
export function add(...routes: ReadonlyArray<UserRoute>): void {
  routes.forEach((route) =>
    _routes.push({
      ...route,
      container: route.container ?? _routerGlobalOptions.container,
      parameters: [],
    })
  );
}

/** Navigates to route based on _path_. */
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

/**
 * Reloads current page.
 *
 * `before` and `after` route hooks will
 *  be invoked also.
 */
export async function reload(): Promise<void> {
  await navigate(window.location.pathname, current, false);
}

/** Makes one step back in navigation history. */
export function back(): void {
  window.history.back();
}

/** Makes one step forward in navigation history. */
export function forward(): void {
  window.history.forward();
}

/**
 * Triggering navigating via browser's buttons, "router.back()", "router.forward()",
 * but not via elements that changes url without setting "state"
 * (default behavior of <a> etc.).
 */
window.addEventListener('popstate', (event: PopStateEvent) => {
  if (event.state !== null && typeof event.state === 'object') {
    to(event.state.path, { willStateChange: false });
  }
});

function findRoute(pathname: string): Route {
  const route = _routes.find(({ path }) => isMatched(pathname, path));

  return route !== undefined
    ? {
        ...route,
        // Parameters need to be updated to hold current path
        // variables if there is any.
        parameters: extractParameters(pathname, route.path),
      }
    : _DEFAULT_ROUTE;
}

/** Navigates to _path_. */
async function navigate(
  path: string,
  route: Route,
  willStateChange: boolean = true
): Promise<void> {
  setIsRouteChangedMarker(current.path !== route.path);

  // Before route render hook
  if (route.before !== undefined) {
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
  if (route.after !== undefined) {
    await Promise.resolve(route.after());
  }

  setIsRouteChangedMarker(false);
}
