// @flow

import MTNode from '../nodes/mtn.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type StateListener<T: { [string]: any }> = {
  to: string,
  fields: string[],
  update: (
    newState: T
  ) => string | Component | MTNode | (string | Component | MTNode)[],
}

export function createState<T: { [string]: any }>(object: T) {
  const listeners: StateListener<T>[] = []

  return {
    state: new Proxy<T>(object, {
      get(target, property, receiver) {
        return target[property]
      },

      set(target, property, value) {
        target[property] = value

        const matchedListeners = listeners.filter(li =>
          li.fields.includes(property)
        )
        matchedListeners.forEach(({ to, update }) => {
          const element = document.querySelector(to)

          if (element) {
            render(to, update(target))
          }
        })

        return true
      },
    }),

    listen(listener: StateListener<T>) {
      listeners.push(listener)
    },
  }
}
