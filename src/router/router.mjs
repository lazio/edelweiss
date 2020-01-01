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
  _routes: Route[]
  current: Route | void

  constructor(routes: Route[]) {
    this._routes = routes
    // First route of the app.
    this.current = routes.find(route => {
      const pathRegExp =
        typeof route.path === 'string'
          ? new RegExp(`^${route.path}$`)
          : route.path

      return pathRegExp.test('/')
    })
  }

  async to(path: string): Promise<void> {
    const route = this._routes.find(r => {
      const pathRegExp =
        typeof r.path === 'string' ? new RegExp(`^${r.path}$`) : r.path

      return pathRegExp.test(path)
    })

    if (route) {
      const toContainer = document.querySelector(route.container)

      if (toContainer) {
        this.current = route
        await render(route.container, route.view())
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

  async reload() {
    if (this.current) {
      const { path, container, view } = this.current
      await render(container, view())
      window.history.replaceState({ path, container }, '', path)
    }
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }
}
