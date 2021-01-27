import { html } from './html';
import { reactive } from './core/reactive';
import { Dependency } from './core/dependency';

/** Shape of route. */
export interface Route {
  /**
   * Used to match against whole URL.
   * Pattern must not start with `^` and end with `$`.
   */
  readonly pattern: string;
  /**
   * Used to mark route to be rendered if _pattern_
   * does not match _path_. If more that one route
   * will have this property set, then first one will
   * be used.
   */
  readonly notFound?: boolean;
  /** @param parameters regexp's capturing groups. */
  template(
    ...parameters: ReadonlyArray<string>
  ): string | HTMLTemplateElement | Iterable<string | HTMLTemplateElement>;
}

// If user will not set custom not found route,
// then this will be used.
const defaultNotFoundRoute: Route = {
  pattern: '(.+)',
  template(path: string): HTMLTemplateElement {
    return html`
      <p>Route that matches <strong>${path}</strong> is not defined.</p>
    `;
  },
};

/**
 * Creates reactive router.
 * _pattern_ will be converted to `RegExp` and
 * matched agains a whole URL.
 */
export function router(
  ...routes: ReadonlyArray<Route>
): readonly [
  page: Dependency<
    string,
    string | HTMLTemplateElement | Iterable<string | HTMLTemplateElement>
  >,
  to: (path: string) => void
] {
  const bound = reactive({ url: window.location.pathname });

  return [
    bound.url((value) => {
      const route =
        routes.find((route) => patternToRegExp(route.pattern).test(value)) ??
        routes.find((route) => route.notFound) ??
        defaultNotFoundRoute;

      // TODO: add relative path navigating?
      window.history.pushState({ path: value }, '', value);

      return route.template(
        ...(patternToRegExp(route.pattern).exec(value) ?? []).slice(1)
      );
    }),
    (path: string) => bound.url(path),
  ];
}

/**
 * Handles routing that are accomplished with browser's buttons
 * or through _History API_:
 *  - forward
 *  - back
 * @param navigator function that are returned by main `router`
 * as second argument.
 */
export function setUpNavigationWithBrowserHistory(
  navigator: (path: string) => void
): void {
  window.addEventListener('popstate', (event: PopStateEvent) => {
    if (event.state) {
      navigator(event.state.path);
    }
  });
}

/** RegExp that match against string and take
 * inner part of value without `^` and `$`.
 * Needed for situations when user can provide
 * `^` or `$`, but not both at the same time.
 */
const START_END_REGEXP = /^\^*?([^$^]+)\$*?$/;

function patternToRegExp(pattern: string): RegExp {
  return new RegExp(pattern.replace(START_END_REGEXP, '^$1$'));
}
