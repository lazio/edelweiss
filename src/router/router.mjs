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
  _routes: Route[]

  constructor(routes: Route[]) {
    this._routes = routes
  }

  to(path: string): void {
    const route = this._routes.find((route) => route.path === path)
    if (route) {
      render(route.container, route.nodes())
    } else {
      throw new Error(`No route is specified for path: ${path}!`)
    }
  }
}
