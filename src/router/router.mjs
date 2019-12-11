// @flow

import MTNode from '../nodes/mtn.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string,
  container: string,
  nodes: () => MTNode | Component | (MTNode | Component)[]
}

export default class Router {
  static _routes: Route[]
  static current: Route | typeof undefined

  constructor(routes: Route[]) {
    Router._routes = routes
    // First route of the app.
    Router.current = routes.find((route) => route.path === '/')
  }

  static to(path: string): void {
    const route = Router._routes.find((route) => route.path === path)
    if (route) {
      Router.current = route
      render(route.container, route.nodes())
    } else {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }

  to(path: string): void {
    Router.to(path)
  }

  get current(): Route | typeof undefined {
    return Router.current
  }
}
