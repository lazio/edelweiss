// @flow

import Match from '../utils/algebraic/match.mjs'
import Maybe from '../utils/algebraic/maybe.mjs'
import { render } from '../render.mjs'
import { element } from '../utils/functional.mjs'
import type Component from '../component/component.mjs'

export type RouteInfo = {
  parameters?: ?RegExp$matchResult,
}

export type Route = {
  path: string | RegExp,
  container?: string,
  before?: () => Promise<void>,
  view: () =>
    | string
    | Component
    | Promise<string>
    | (string | Component | Promise<string>)[],
  after?: () => Promise<void>,
}

/**
 * Holds all routes that user pass to "Router.add()".
 */
const _routes: Map<string | RegExp, Route> = new Map()
/**
 * Holds current route.
 */
let _current: {
  path: string | RegExp,
  container?: string,
  before?: () => Promise<void>,
  view: () =>
    | string
    | Component
    | Promise<string>
    | (string | Component | Promise<string>)[],
  after?: () => Promise<void>,
  parameters?: ?RegExp$matchResult,
} = {
  path: '',
  view() {
    return ''
  },
}
/**
 * Container for elements from all routes.
 * If all routes will have the same container, then this variable may be set and used.
 */
let _pageContainer: string | void

export default class Router {
  static get current() {
    return _current
  }

  static get container() {
    return _pageContainer
  }

  static set container(value: string) {
    _pageContainer = value
  }

  static add(routes: Route | Route[]) {
    Array.isArray(routes)
      ? routes.forEach((route) => _routes.set(route.path, route))
      : _routes.set(routes.path, routes)
  }

  static async to(
    path: string,
    options?: {
      /**
       * Determine whether navigating to route must update "window.history" or not.
       * By default this method updates "window.history".
       */
      willStateChange?: boolean,
    } = {}
  ): Promise<void> {
    if (_routes.size === 0) {
      throw new Error(`You cannot navigate to ${path} because you didn't define any routes!
      At first call "Router.add(...)".`)
    }

    let routeFound = false

    Array.from(_routes.entries()).forEach(([key, route]) => {
      const pathRegExp =
        typeof key === 'string' ? new RegExp(regexpifyString(key)) : key

      ;(routeFound = pathRegExp.test(path)) &&
        Maybe.of(route.container || _pageContainer)
          .mapNothing(() => {
            throw new Error(`You does not set container for route: ${path}.
        No local(in Route) and no global(in Router.container) container defined.`)
          })
          .map((container) => {
            element(container)
              .mapNothing(() => {
                throw new Error(
                  `On the page is no element that matches ${container} selector!`
                )
              })
              .map(async (toContainer) => {
                /**
                 * If match exists in path, then result is array, where first item is
                 * the whole matched string.
                 * If parameters exist in path (they must be surrounded by brackets), then
                 * second item and go on to end of array are parameters.
                 *
                 * For more info: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
                 */
                const pathMatch = pathRegExp.exec(path)

                _current = {
                  ...route,
                  parameters: pathMatch,
                }

                // Before route render hook
                if (route.before) {
                  await route.before()
                }

                render(container, route.view())

                if (
                  typeof options.willStateChange === 'undefined' ||
                  options.willStateChange
                ) {
                  window.history.pushState({ path, container }, '', path)
                }

                // After route render hook
                if (route.after) {
                  await route.after()
                }
              })
          })
    })

    if (!routeFound) {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }

  static reload(): void {
    Match.of(_current)
      /**
       * This property equals to empty string if user did not navigate to pages and invokes
       * this methods before first "Router.to".
       */
      .on(
        ({ path }) => typeof path === 'string' && path.length === 0,
        () => {
          throw new Error(
            "Nothing to reload - you didn't navigate to any pages yet."
          )
        }
      )
      .otherwise(({ path, container, view }) => {
        Maybe.of(container || _pageContainer)
          .map((currentContainer) => {
            render(currentContainer, view())
            return currentContainer
          })
          .mapNothing(() => {
            throw new Error(`You do not set container for route: ${path.toString()}.
        No local(in Route) and no global(in Router.container) container defined.`)
          })
      })
  }

  static back() {
    window.history.back()
  }

  static forward() {
    window.history.forward()
  }
}

/**
 * Triggering navigating via browser's buttons and "Router.back()", "Router.forward()".
 */
window.addEventListener(
  'popstate',
  (event: { state: { path: string, container: string } }) => {
    Router.to(event.state.path, { willStateChange: false })
  }
)

function regexpifyString(regexp: string): string {
  return (
    Match.of(regexp)
      .multi(true)
      /**
       * We check if path contains "/" - they all must be escaped.
       */
      .on(
        (re) => /[^\\]\//g.test(re),
        (normalizedRegExp) => normalizedRegExp.split('/').join('\\/')
      )
      .on(
        (normalizedRegExp) => !normalizedRegExp.startsWith('^'),
        (normalizedRegExp) => `^${normalizedRegExp}`
      )
      .on(
        (normalizedRegExp) => !normalizedRegExp.endsWith('$'),
        (normalizedRegExp) => `${normalizedRegExp}$`
      )
      .extract()
  )
}
