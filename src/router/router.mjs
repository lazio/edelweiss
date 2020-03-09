// @flow

import type Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type RouteInfo = {
  parameters: ?RegExp$matchResult,
}

export type Route = {
  path: string | RegExp,
  container?: string,
  view: () => string | Component | (string | Component)[],
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
  view: () => string | Component | (string | Component)[],
  parameters: ?RegExp$matchResult,
} | void
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
      ? routes.forEach(route => _routes.set(route.path, route))
      : _routes.set(routes.path, routes)
  }

  static to(
    path: string,
    options?: {
      /**
       * Determine whether navigating to route must update "window.history" or not.
       * By default this method updates "window.history".
       */
      willStateChange?: boolean,
    } = {}
  ): void {
    if (_routes.size === 0) {
      throw new Error(`You cannot navigate to ${path} because you didn't define any routes!
      At first call "Router.add(...)".`)
    }

    /**
     * We need to store regexp of path in order to get captured groups if
     * there will be ones.
     */
    let pathRegExp = null
    let route = null

    for (const [key, value] of _routes.entries()) {
      if (!route) {
        pathRegExp =
          typeof key === 'string' ? new RegExp(regexpifyString(key)) : key

        if (pathRegExp.test(path)) {
          route = value
        }
      } else {
        break
      }
    }

    if (route && pathRegExp) {
      const container = route.container || _pageContainer

      if (container) {
        const toContainer = document.querySelector(container)

        if (toContainer) {
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

          render(container, route.view())

          if (
            typeof options.willStateChange === 'undefined' ||
            options.willStateChange
          ) {
            window.history.pushState({ path, container }, '', path)
          }
        } else {
          throw new Error(
            `On the page is no element that matches ${container} selector!`
          )
        }
      } else {
        throw new Error(`You does not set container for route: ${path}.
        No local(in Route) and no global(in Router.container) container defined.`)
      }
    } else {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }

  static reload(): void {
    if (_current) {
      const { path, container, view } = _current
      const currentContainer = container || _pageContainer

      if (currentContainer) {
        render(currentContainer, view())
        window.history.replaceState(
          { path, container: currentContainer },
          '',
          path
        )
      } else {
        throw new Error(`You do not set container for route: ${path.toString()}.
        No local(in Route) and no global(in Router.container) container defined.`)
      }
    } else {
      console.error("Nothing to reload - you didn't navigate to any pages yet.")
    }
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
    const { path } = event.state
    Router.to(path, { willStateChange: false })
  }
)

function regexpifyString(regexp: string): string {
  let normalizedRegExp = regexp

  /**
   * We check if path contains "/" - they all must be escaped.
   */
  if (/[^\\]\//g.test(normalizedRegExp)) {
    const parts = normalizedRegExp.split('/')
    normalizedRegExp = parts.join('\\/')
  }

  if (!normalizedRegExp.startsWith('^')) {
    normalizedRegExp = `^${normalizedRegExp}`
  }
  if (!normalizedRegExp.endsWith('$')) {
    normalizedRegExp = `${normalizedRegExp}$`
  }

  return normalizedRegExp
}
