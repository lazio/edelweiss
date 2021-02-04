import { html } from './html';
import { reactive } from './core/reactive';
import type { Dependency } from './core/dependency';
import type { SecureHTMLNode } from './core/bridge';

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
  template(...parameters: ReadonlyArray<string>): SecureHTMLNode;
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

const page = reactive({ url: window.location.pathname });

/**
 * Creates reactive router.
 * _pattern_ will be converted to `RegExp` and
 * matched agains a whole URL.
 */
export function router(
  ...routes: ReadonlyArray<Route>
): Dependency<string, SecureHTMLNode> {
  return page.url((path) => {
    const route =
      routes.find((route) => patternToRegExp(route.pattern).test(path)) ??
      routes.find((route) => route.notFound) ??
      defaultNotFoundRoute;

    window.history.pushState({ path }, '', path);

    return route.template(
      ...(patternToRegExp(route.pattern).exec(path) ?? []).slice(1)
    );
  });
}

/**
 * Navigates to _path_.
 * If no route is defined for _path_,
 * then route with `notFound` property will
 * be rendered. Otherwise - default _not found_ route.
 */
export function to(path: string): void {
  page.url(path);
}

// Handles routing that are accomplished with browser's buttons
// or through _History API_:
//  - forward
//  - back
window.addEventListener('popstate', (event: PopStateEvent) => {
  if (event.state) {
    to(event.state.path);
  }
});

/**
 * RegExp that match against string and take
 * inner part of path without `^` and `$`.
 * Needed for situations when user can provide
 * `^` or `$`, but not both at the same time.
 */
const START_END_REGEXP = /^\^*?([^$^]+)\$*?$/;

function patternToRegExp(pattern: string): RegExp {
  return new RegExp(pattern.replace(START_END_REGEXP, '^$1$'));
}
