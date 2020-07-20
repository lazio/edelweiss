// @flow

import Component from '../component/component.mjs'
import { uid } from '../utils/uid.mjs'
import { normalizeStyles } from '../utils/styles.mjs'
import { registerCustomElement } from './custom_element.mjs'
import {
  eventListenerRegExp,
  customElementRegExp,
  styleAttributeRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps.mjs'
import type { Styles } from '../utils/styles.mjs'

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<
  string,
  {
    // Name of the event: event listener
    // eslint-disable-next-line func-call-spacing
    [key: string]: ((event: Event) => void)
      | { handleEvent: (event: Event) => void },
  }
>()

export async function html(parts: string[], ...variables: []) {
  // Count of @event attributes of one element in template
  let eventsInElement = 0

  return parts.reduce(async (previous, current, index) => {
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
      | Class<Element>
      | ((...args: []) => void)
      | { handleEvent: (event: Event) => void }
      | Styles
      | Array<string | Promise<string>>
      | boolean
      | Promise<string>
      | void = variables[index]

    if (variable !== undefined && variable !== null) {
      // Gets template from Component
      let stringifiedVariable =
        variable instanceof Component ? await variable._createNodes() : variable

      /**
       * Variable may be a Promise, so we must wait for resolving it and then
       * return resilt. Also we prevent from inseting commas into template.
       */
      if (Array.isArray(stringifiedVariable)) {
        stringifiedVariable = (await Promise.all(stringifiedVariable)).join('')
      }

      /**
       * If variable is Promise we wait when it will be fulfilled.
       */
      stringifiedVariable =
        stringifiedVariable instanceof Promise
          ? await stringifiedVariable
          : stringifiedVariable

      // Handle @event listener if there is any.
      const eventListener = eventListenerRegExp.exec(current)
      if (eventListener) {
        if (
          typeof stringifiedVariable !== 'function' &&
          !stringifiedVariable.handleEvent
        ) {
          throw new TypeError(`Event listener must be type of "function" or object with
          "handleEvent" method, but given "${typeof stringifiedVariable}".`)
        }

        const eventId = uid()
        eventListenersMap.set(eventId, {
          [eventListener[1]]: stringifiedVariable,
        })

        current = current.replace(
          eventListener[0],
          `data-event-id${eventsInElement++}=`
        )
        return ((await previous) || '') + current + eventId
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

        return ((await previous) || '') + current
      }

      // Handle style attribute
      if (styleAttributeRegExp.test(current)) {
        if (
          typeof stringifiedVariable === 'string' ||
          (typeof stringifiedVariable === 'object' &&
            !stringifiedVariable.handleEvent &&
            Object.values(stringifiedVariable).every(
              (value) => typeof value === 'string' || typeof value === 'number'
            ))
        ) {
          stringifiedVariable = normalizeStyles(stringifiedVariable)
        } else {
          throw new Error(
            'Styles that passed to "style" attribute must be valid CSS string ' +
              'or plain object, where keys are valid CSS properties and values have "number" or "string" type. ' +
              'Given ->\n' +
              // $FlowFixMe
              `"${stringifiedVariable}"`
          )
        }
      }

      // Handle custom element in html
      const customElementMatch = customElementRegExp.exec(current)
      if (customElementMatch) {
        // eslint-disable-next-line no-prototype-builtins
        if (Element.isPrototypeOf(stringifiedVariable)) {
          // $FlowFixMe - we already check for Class.
          registerCustomElement(customElementMatch, stringifiedVariable)
          return (
            (await previous) +
            current.replace(
              customElementRegExp,
              // Get rid of hyphens as start or end symbol of tag name.
              `<${customElementMatch[1]}`.replace(/^<-(.+)-$/, '<$1')
            )
          )
        } else {
          throw new Error(
            `You must pass a class constructor to custom element ${customElementMatch[1]}. But given ->` +
              // $FlowFixMe
              `"${stringifiedVariable}"`
          )
        }
      }

      // Regular attributes
      // $FlowFixMe - need to be improved.
      return ((await previous) || '') + current + stringifiedVariable
    } else {
      // End of template
      return ((await previous) || '') + current
    }
  }, '')
}
