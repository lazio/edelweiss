// @flow

import Component from '../component/component.mjs'

import { eventListenerRegExp, booleanAttributeRegExp } from '../utils/regexps.mjs'
import { uid } from '../utils/uid.mjs'

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<string, {
    // Name of the event: event listener
    // eslint-disable-next-line func-call-spacing
    [string]: ((event: Event) => void) | { handleEvent: (event: Event) => void },
  }>()

export function html(parts: string[], ...variables: []) {
  // Count of @event attributes of one element in template
  let eventsInElement = 0

  const result = parts.reduce((previous, current, index) => {
    // Element tag end so we can set "eventsInElement" to zero
    if (current.search(/[^-]>/) !== -1) {
      eventsInElement = 0
    }

    /** Variable may be:
     *
     * * "string" type
     * * plain "Array"
     * * plain "function"
     * * plain object
     * * Component
     *
     * Another values is not handled and cannot stringified properly.
     */
    const variable: string
      | Component
      | ((...args: []) => void)
      | { handleEvent: (event: Event) => void }
      | []
      | boolean
      | void = variables[index]

    if (variable !== undefined && variable !== null) {
      // Gets template from Component
      let stringifiedVariable =
        variable instanceof Component ? variable.template() : variable

      // Prevent from inseting commas into template
      stringifiedVariable = Array.isArray(stringifiedVariable)
        ? stringifiedVariable.join('')
        : stringifiedVariable

      // Handle @event listener if there is any.
      const eventListener = eventListenerRegExp.exec(current)
      if (eventListener) {
        if (
          (typeof stringifiedVariable !== 'function' &&
            !stringifiedVariable.handleEvent)
        ) {
          throw new TypeError(`Event listener must be type of "function" or object with
          "handleEvent" method, but given "${typeof stringifiedVariable}".`)
        }

        const eventId = uid()
        eventListenersMap.set(`${eventId}`, {
          [eventListener[1]]: stringifiedVariable,
        })

        current = current.replace(
          eventListener[0],
          `data-event-id${eventsInElement++}=`
        )
        return (previous || '') + current + eventId
      }

      // Handle ?attribute
      const booleanAttribute = booleanAttributeRegExp.exec(current)
      if (booleanAttribute) {
        /**
         * It accepts all values and check if it is falsy or truthy.
         * There are 7 falsy values in JS: [values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
         */
        current = stringifiedVariable
          // Add value if truthy
          ? current.replace(booleanAttribute[0], booleanAttribute[1])
          // Remove value if falsy
          : current.replace(booleanAttribute[0], '')

        return (previous || '') + current
      }

      // Regular attributes
      // $FlowFixMe - need to be improved.
      return (previous || '') + current + stringifiedVariable
    } else {
      // End of template
      return (previous || '') + current
    }
  }, '')

  return result
}
