// @flow

import Router from '../router/router.mjs'

export function createState<T: { [string]: mixed }>(object: T) {
  return new Proxy<T>(object, {
    set(target, property, value, receiver) {
      const isSuccessful = Reflect.set(target, property, value, receiver)

      if (isSuccessful) {
        Router.reload()
      }

      return isSuccessful
    },
    deleteProperty(target, property) {
      if (property in target) {
        const isSuccessful = Reflect.deleteProperty(target, property)

        if (isSuccessful) {
          Router.reload()
        }

        return isSuccessful
      } else {
        return false
      }
    },
  })
}
