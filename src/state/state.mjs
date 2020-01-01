// @flow

import ENode from '../nodes/en.mjs'
import Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type StateListener<T: { [string]: any }> = {
  to: string,
  fields: string[],
  update: (newStateContainer: {
    state: T,
    onChange: (listener: StateListener<T>) => void,
  }) => string | Component | ENode | (string | Component | ENode)[],
}

export function createState<T: { [string]: any }>(object: T) {
  const listeners: StateListener<T>[] = []

  const stateContainer = {
    state: new Proxy<T>(object, {
      set(target, property, value) {
        target[property] = value

        const matchedListeners = listeners.filter(li =>
          li.fields.includes(property)
        )
        matchedListeners.forEach(({ to, update }) => {
          const element = document.querySelector(to)

          if (element) {
            // $FlowFixMe
            render(to, update(stateContainer))
          }
        })

        return true
      },
    }),

    onChange(listener: StateListener<T>) {
      listeners.push(listener)
    },
  }

  return stateContainer
}
