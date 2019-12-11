// @flow

import Router from '../router/router.mjs'

export type Target = { [string]: mixed }
export type StateListener = {
  +path?: string,
  update?: (newState: Target) => void
}

export function makeState(
  object: Target,
  listenerObject?: StateListener
): Target {
  return new Proxy(object, {
    get(object: Target, field: string) {
      return Object.freeze(object[field])
    },
    set(object: Target, field: string, value: mixed) {
      object[field] = value

      if (listenerObject) {
        if (listenerObject.path) {
          if (Router.current && listenerObject.path === Router.current.path) {
            if (listenerObject.update) {
              listenerObject.update(object)
            }
            if (listenerObject.path) {
              Router.to(listenerObject.path)
            }
          }
        } else if (listenerObject.update) {
          listenerObject.update(object)
        }
      }

      return true
    }
  })
}
