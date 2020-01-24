// @flow

import ENode from '../nodes/en.mjs'
import Component from '../component/component.mjs'
import { normalizeStyles } from '../utils/styles.mjs'
import { render } from '../render.mjs'

import type { Attributes } from '../nodes/en.mjs'

export type StateListener<T: { [string]: any }> = {
  to?: string,
  fields: string[],
  reactiveAttributes?: $Keys<Attributes>[],
  update: (newStateContainer: {
    state: T,
    onChange: (listener: StateListener<T>) => void,
  }) => string | Component | ENode | (string | Component | ENode)[] | void,
}

export function createState<T: { [string]: any }>(object: T) {
  const listeners: {
    initialAttributes?: Attributes,
    userProperties: StateListener<T>,
  }[] = []

  const stateContainer = {
    state: new Proxy<T>(object, {
      set(target, property, value) {
        target[property] = value

        const matchedListeners = listeners.filter(li =>
          li.userProperties.fields.includes(property)
        )

        matchedListeners.forEach(({ initialAttributes, userProperties }) => {
          const { to, update, reactiveAttributes } = userProperties

          if (to) {
            const element = document.querySelector(to)

            if (element) {
              // $FlowFixMe - Proxy as T
              const nodes = update(stateContainer)

              if (typeof nodes !== 'undefined') {
                if (reactiveAttributes) {
                  if (initialAttributes) {
                    reactiveAttributes.forEach(attribute => {
                      if (typeof nodes === 'string') {
                        const initialAttributeValue =
                          initialAttributes[attribute]

                        switch (typeof initialAttributeValue) {
                          case 'number':
                          case 'string':
                            element.setAttribute(
                              attribute,
                              `${initialAttributeValue} ${nodes}`
                            )
                            break
                          case 'boolean':
                            ;/^true$/.test(nodes)
                              ? element.setAttribute(attribute, nodes)
                              : element.removeAttribute(attribute)
                            break
                          case 'object':
                            if (attribute === 'style') {
                              element.setAttribute(
                                attribute,
                                `${normalizeStyles(
                                  initialAttributeValue
                                )} ${nodes}`
                              )
                            }
                            break
                          default:
                            element.setAttribute(attribute, nodes)
                        }
                      } else {
                        console.error(
                          `Attribute's value must be type of "string, but given ${typeof nodes}"`
                        )
                      }
                    })
                  } else {
                    reactiveAttributes.forEach(attribute => {
                      if (typeof nodes === 'string') {
                        element.setAttribute(attribute, nodes)
                      } else {
                        console.error(
                          `Attribute's value must be type of "string, but given ${typeof nodes}"`
                        )
                      }
                    })
                  }
                } else {
                  render(to, nodes)
                }
              } else {
                console.warn(
                  'If "update" method doesn\'t return value, then you can omit "to" field in "onChange" function.'
                )
              }
            }
          } else {
            const nodes = update(stateContainer)

            if (nodes) {
              console.warn(
                'If "update" method returns value, then you probably should provide at least "to" field in "onChange" function.'
              )
            }
          }
        })

        return true
      },
    }),

    onChange(listener: StateListener<T>) {
      const { reactiveAttributes, to } = listener

      let initialAttributes: Attributes

      if (reactiveAttributes) {
        if (to) {
          const element = document.querySelector(to)

          if (element) {
            reactiveAttributes.forEach(attribute => {
              const attributeValue = element.getAttribute(attribute)

              if (attributeValue) {
                if (!initialAttributes) {
                  initialAttributes = {}
                }

                initialAttributes[attribute] = attributeValue
              }
            })
          }
        } else {
          console.error(
            'If "reactiveAttributes" is present then "to" field must also exists.'
          )
        }
      }

      listeners.push({
        initialAttributes,
        userProperties: listener,
      })
    },
  }

  return stateContainer
}
