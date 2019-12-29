// @flow

import MTNode from '../nodes/mtn.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type Target = { [string]: mixed }

export type StateListener = {
  to: string,
  fields: string[],
  update: (newState: Target) => string | Component | MTNode | (string | Component | MTNode)[]
}

export function createState(object: Target) {
  const listeners: StateListener[] = []

  return {
    state: new Proxy(object, {
      get(target, property, receiver) {
        return target[property]
      },

      set(target, property, value) {
        target[property] = value

        const matchedListeners = listeners.filter((li) => li.fields.includes(property))
        matchedListeners.forEach(({ to, update }) => {
          const element = document.querySelector(to)

          if (element) {
            render(to, update(target))
          }
        })

        return true
      }
    }),

    on(listener: StateListener) {
      listeners.push(listener)
    }
  }
}
