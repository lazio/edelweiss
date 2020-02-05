// @flow

import type ENode from '../nodes/en.mjs'
import type Component from '../component/component.mjs'

import { render } from '../render.mjs'

export type StateListener<T: { [string]: any }> = {
  to?: string,
  fields: string[],
  update: (
    state: T
  ) => string | Component | ENode | (string | Component | ENode)[] | void,
}

export function createState<T: { [string]: any }>(object: T) {
  const listeners: StateListener<T>[] = []

  const stateContainer = {
    state: new Proxy<T>(object, {
      set(target, property, value) {
        target[property] = value

        const listenersArray = listeners.filter(
          listener => listener.fields.includes(property)
        )

        listenersArray.forEach(({ to, update }) => {
          if (to) {
            const container = document.querySelector(to)

            if (container) {
              const nodes = update(target)
              if (nodes) {
                render(to, nodes)
              } else {
                console.warn('If you provide "to" field in "onChange" method, you probably want to return value in "update" function?')
              }
            } else {
              console.error(`Such element(s): ${to} doesn't exists in document.`)
            }
          } else {
            const nodes = update(target)
            if (nodes) {
              console.error('If you return value from "update" function, then you must provide "to" field.')
            }
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
