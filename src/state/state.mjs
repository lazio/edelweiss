// @flow

import Router from '../router/router.mjs'

export function createState<T: { [string]: any }>(object: T) {
  return new Proxy<T>(object, {
    set(target, property, value) {
      target[property] = value

      Router.reload()

      return true
    },
  })
}
