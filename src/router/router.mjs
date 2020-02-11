// @flow

import ENode from '../nodes/en.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string | RegExp,
  container: string,
  view: () => string | ENode | Component | (string | ENode | Component)[],
}

export default class Router {
  static _routes: Route[]
  static current: Route | void

  static add(routes: Route | Route[]) {
    if (!Router._routes) {
      Router._routes = []
    }

    Array.isArray(routes)
      ? Router._routes.push(...routes)
      : Router._routes.push(routes)

    if (!Router.current) {
      // First route of the app.
      Router.current = Router._routes.find(route => {
        const pathRegExp =
          typeof route.path === 'string'
            ? new RegExp(`^${route.path}$`)
            : route.path

        return pathRegExp.test(window.location.pathname)
      })
    }
  }

  static to(path: string): void {
    const route = Router._routes.find(r => {
      const pathRegExp =
        typeof r.path === 'string' ? new RegExp(`^${r.path}$`) : r.path

      return pathRegExp.test(path)
    })

    if (route) {
      const toContainer = document.querySelector(route.container)

      if (toContainer) {
        Router.current = route
        render(route.container, route.view())
        window.history.pushState({ path, container: route.container }, '', path)
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
    }
  }

  static back() {
    window.history.back()
  }

  static forward() {
    window.history.forward()
  }
}
