// @flow

import type Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string | RegExp,
  container: string,
  view: () => string | Component | (string | Component)[],
}

export default class Router {
  static _routes: Route[] | void
  static current: Route | void

  static add(routes: Route | Route[]) {
    if (!Router._routes) {
      Router._routes = []
    }

    Array.isArray(routes)
      ? Router._routes.push(...routes)
      : Router._routes.push(routes)
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
    if (!Router._routes) {
      throw new Error(`You cannot navigate to ${path} because you didn't define any routes!
      At first call "Router.add(...)".`)
    }

    const route = Router._routes.find(r => {
      const pathRegExp =
        typeof r.path === 'string'
          ? new RegExp(regexpifyString(r.path))
          : r.path

      return pathRegExp.test(path)
    })

    if (route) {
      const toContainer = document.querySelector(route.container)

      if (toContainer) {
        Router.current = route
        render(route.container, route.view())

        if (
          typeof options.willStateChange === 'undefined' ||
          options.willStateChange
        ) {
          window.history.pushState(
            { path, container: route.container },
            '',
            path
          )
        }
      } else {
        throw new Error(
          `On the page is no element that matches ${route.container} selector!`
        )
      }
    } else {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }

  static reload(): void {
    if (Router.current) {
      const { path, container, view } = Router.current
      render(container, view())
      window.history.replaceState({ path, container }, '', path)
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

  if (!normalizedRegExp.startsWith('^')) {
    normalizedRegExp = `^${normalizedRegExp}`
  }
  if (!normalizedRegExp.endsWith('$')) {
    normalizedRegExp = `${normalizedRegExp}$`
  }

  return normalizedRegExp
}
