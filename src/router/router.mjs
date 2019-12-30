// @flow

import MTNode from '../nodes/mtn.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string,
  container: string,
  view: () => string | MTNode | Component | (string | MTNode | Component)[],
}

export default class Router {
  _routes: Route[]
  current: Route | void

  constructor(routes: Route[]) {
    this._routes = routes
    // First route of the app.
    this.current = routes.find(route => route.path === '/')
  }

  async to(path: string): Promise<void> {
    const route = this._routes.find(route => route.path === path)
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
}
