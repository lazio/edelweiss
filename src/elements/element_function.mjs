// @flow

import { normalizeStyles } from '../utils/styles.mjs'
import { convertToDom } from '../utils/dom.mjs'

import type { Styles } from '../utils/styles.mjs'
import type Component from '../component/component.mjs'

/**
 * Define all possible types of **<input>**.
 */
export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

/**
 * Define target value for links.
 */
export type TargetType = '_blank' | '_self' | '_parent' | '_top'

export type FormMethod = 'post' | 'get' | 'dialog'

export type Attributes = {
  style?: Styles,
  class?: string,
  target?: TargetType,
  method?: FormMethod,
  type?: InputType,
  name?: string,
  label?: string,
  disabled?: boolean,
  value?: string | number,
  max?: number,
  cite?: string,
  src?: string,
  alt?: string,
  datetime?: string,
  [string]: string | boolean | number,
}

// Defines all possible actions that trigger events.
export type EventType =
  | 'click'
  | 'input'
  | 'change'
  | 'keydown'
  | 'keyup'
  | 'focus'
  | 'resize'
  | 'keypress'
  | 'mousedown'
  | 'mouseup'
  | 'mouseenter'
  | 'mouseover'
  | 'mousemove'
  | 'dblclick'
  | 'mouseout'
  | 'mouseleave'
  | 'contextmenu'
  | 'load'
  | 'DOMContentLoaded'
  | 'afterprint'
  | 'animationcancel'
  | 'animationend'
  | 'appinstalled'
  | 'beforeinstallprompt'
  | 'beforeprint'
  | 'beforeunload'
  | 'blur'
  | 'cancel'
  | 'canplay'
  | 'canplaythrough'
  | 'cuechange'
  | 'devicemotion'
  | 'deviceorientation'
  | 'deviceorientationabsolute'
  | 'durationchange'
  | 'ended'
  | 'error'
  | 'gotpointercapture'
  | 'hashchange'
  | 'invalid'
  | 'loadeddata'
  | 'loadedmetadata'
  | 'loadend'
  | 'loadstart'
  | 'lostpointercapture'
  | 'message'
  | 'messageerror'
  | 'pause'
  | 'play'
  | 'pointercancel'
  | 'pointerdown'
  | 'pointerenter'
  | 'pointerleave'
  | 'pointermove'
  | 'pointerout'
  | 'pointerover'
  | 'pointerup'
  | 'popstate'
  | 'rejectionhandled'
  | 'reset'
  | 'scroll'
  | 'select'
  | 'storage'
  | 'submit'
  | 'transitioncancel'
  | 'transitionend'
  | 'unhandledrejection'
  | 'unload'
  | 'wheel'
  | 'toggle'

// Object that describe event listener consumed by **ENode** object.
export type ElementEventListenersObject = {
  [type: EventType]: EventListener,
}

export type ElementChildren = string | HTMLElement | Component | (string | HTMLElement | Component)[]

export type Constructor = Class<Element>

export type CustomOptions = {
  tag: string,
  constructor: Constructor,
  children?: ElementChildren,
  attributes?: Attributes,
  listeners?: ElementEventListenersObject,
  extend?: string,
}

/**
 * Main function that creates HTML element.
 */
export default function element(
  tag: string,
  children?: ElementChildren,
  attributes?: Attributes = {},
  listeners?: ElementEventListenersObject
): HTMLElement {
  const createdElement = document.createElement(tag)

  fillElement(createdElement, children, attributes, listeners)

  return createdElement
}

/**
 * Creates cuctom element.
 */
export function custom({
  tag,
  children,
  attributes = {},
  listeners,
  extend,
}: CustomOptions): HTMLElement {
  if (!constructor) {
    throw new Error(
      `Constructor value of the Custom ${tag} node must be provided!`
    )
  }

  const customElementConstructor: Constructor | null = customElements.get(tag)
  if (!customElementConstructor) {
    customElements.define(
      tag,
      constructor,
      extend ? { extends: extend } : undefined
    )
  }

  const elementName = extend || tag
  const elementCreationOptions = extend ? { is: tag } : undefined

  // $FlowFixMe
  const element = document.createElement(elementName, elementCreationOptions)

  fillElement(element, children, attributes, listeners)
  if (elementCreationOptions) {
    element.setAttribute('is', elementCreationOptions.is)
  }

  return element
}

function fillElement(
  element: HTMLElement,
  children?: ElementChildren,
  attributes?: Attributes = {},
  listeners?: ElementEventListenersObject
): void {
  if (Object.keys(attributes).length > 0) {
    // $FlowFixMe
    const attributesEntries: [string, $Values<Attributes>][] = Object.entries(
      attributes
    )
    attributesEntries.forEach(([key, value]) => {
      if (typeof value === 'boolean' && !value) {
        element.removeAttribute(key)
      } else {
        if (key === 'style' && typeof value === 'object') {
          value = normalizeStyles(value)
        }

        // $FlowFixMe
        element.setAttribute(key, value) // value may only be `string` or `number` type
      }
    })
  }

  if (children) {
    element.append(...convertToDom(children))
  }

  if (listeners) {
    const types = Object.keys(listeners)
    types.forEach(eventType => {
      // $FlowFixMe
      element.addEventListener(eventType, listeners[eventType])
    })
  }
}
