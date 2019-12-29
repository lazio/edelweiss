// @flow

import MTNode from '../nodes/mtn.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string,
  container: string,
  nodes: () => string | MTNode | Component | (string | MTNode | Component)[]
}

export default class Router {
  _routes: Route[]
  current: Route | typeof undefined

  constructor(routes: Route[]) {
    this._routes = routes
    // First route of the app.
    this.current = routes.find((route) => route.path === '/')
  }

  to(path: string): void {
    const route = this._routes.find((route) => route.path === path)
    if (route) {
      const toContainer = document.querySelector(route.container)

      if (toContainer) {
        this.current = route
        render(route.container, route.nodes())
      } else {
        throw new Error(`On the page is no element that matches ${route.container} selector!`)
      }
    } else {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }
}
