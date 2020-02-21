// @flow

import type { ElementChildren } from '../elements/element_function.mjs'

import { render } from '../render.mjs'

export type Route = {
  path: string | RegExp,
  container: string,
  view: () => ElementChildren,
}

export default class Router {
  static _routes: Route[] | void
  static _history: string[] | void
  static _currentStateIndex: number | void
  static current: Route | void

  static add(routes: Route | Route[]) {
    if (!Router._routes) {
      Router._routes = []
    }
    if (!Router._history) {
      Router._history = []
    }

    Array.isArray(routes)
      ? Router._routes.push(...routes)
      : Router._routes.push(routes)
  }

  static to(path: string): void {
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

        Router._history
          ? Router._history.push(path)
          : (Router._history = [path])
        // $FlowFixMe
        Router._currentStateIndex = Router._history.length - 1

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
    } else {
      console.error("Nothing to reload - you didn't navigate to any pages yet.")
    }
  }

  static back() {
    if (typeof Router._currentStateIndex !== 'undefined') {
      if (Router._currentStateIndex > 0) {
        if (Router._history) {
          if (Router._history.length > 1) {
            Router._currentStateIndex--
            const path = Router._history[Router._currentStateIndex]
            Router.to(path)
          } else {
            console.info(
              'You cannot return to previous page, because you opened one page only.'
            )
          }
        } else {
          console.error(
            "You cannot return to previous page - you didn't navigate to any pages yet."
          )
        }
      } else {
        console.info('You are on first visited page.')
      }
    } else {
      console.error(
        "You cannot return to previous page, because you didn't navigate to pages yet."
      )
    }
  }

  static forward() {
    if (typeof Router._currentStateIndex !== 'undefined') {
      if (Router._history) {
        if (Router._currentStateIndex < Router._history.length - 1) {
          Router._currentStateIndex++
          const path = Router._history[Router._currentStateIndex]
          Router.to(path)
        } else {
          console.info(
            'You cannot navigate to next page, because you are on the last opened page.'
          )
        }
      } else {
        console.error(
          "You cannot navigate to next page - you didn't navigate to any pages yet."
        )
      }
    } else {
      console.error(
        "You cannot navigate to next page, because you didn't navigate to pages yet."
      )
    }
  }
}

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
