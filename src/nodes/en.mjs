// @flow

import Component from '../component/component.mjs'
import { normalizeStyles } from '../utils/styles.mjs'
import type { Styles } from '../utils/styles.mjs'

export type Attributes = {
  style: Styles,
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
export type ENodeEventListener = {
  type: EventType,
  listener: EventListener,
}

/**
 * Main class that creates DOM node.
 */
export default class ENode {
  /** @private */
  +_tag: string
  /**  @private */
  +_attributes: Attributes
  /**  @private */
  +_children: ENode | Component | (ENode | Component | string)[] | string | typeof undefined
  /** @private */
  +_listeners: ENodeEventListener | ENodeEventListener[] | typeof undefined

  /**
   * Creates node that represent DOM's element.
   * @throws {Error} if **tag** isn't provided.
   */
  constructor(tag: string, options?: ENodeOptions = {}) {
    if (!tag) {
      throw new Error("Tag name isn't provided!")
    } else {
      this._tag = tag
    }

    const { attributes, children, listeners } = options

    if (attributes) {
      this._attributes = attributes
    } else {
      this._attributes = {}
    }
    this._children = children
    this._listeners = listeners
  }

  /**
   * Creates element based on [this] node information.
   */
  createElement(): HTMLElement {
    const element = document.createElement(this._tag)
    return this._attachOptionsTo(element)
  }

  /**
   * Attach listeners, sets attributes and add children to *element* parameter.
   */
  _attachOptionsTo(element: HTMLElement): HTMLElement {
    if (Object.keys(this._attributes).length > 0) {
      // $FlowFixMe
      const attributesEntries: [string, $Values<Attributes>][] = Object.entries(
        this._attributes
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

    if (this._children) {
      if (Array.isArray(this._children)) {
        this._children.forEach((child) => {
          if (child instanceof ENode) {
            element.append(child.createElement())
          } else if (child instanceof Component) {
            const nodes = child.build()
            if (Array.isArray(nodes)) {
              element.append(...nodes.map((node) => node.createElement()))
            } else {
              element.append(nodes.createElement())
            }
          } else {
            element.append(child)
          }
        })
      } else if (this._children instanceof ENode) {
        element.append(this._children.createElement())
      } else if (this._children instanceof Component) {
        const nodes = this._children.build()
        if (Array.isArray(nodes)) {
          element.append(...nodes.map((node) => node.createElement()))
        } else {
          element.append(nodes.createElement())
        }
      } else {
        element.append(this._children)
      }
    }

    if (this._listeners) {
      if (Array.isArray(this._listeners)) {
        this._listeners.forEach(({ type, listener }) => {
          element.addEventListener(type, listener)
        })
      } else {
        const { type, listener } = this._listeners
        element.addEventListener(type, listener)
      }
    }

    return element
  }
}

// Options that define parameters for creating **ENode** object.
//
// *extend* is used while creating custom node {@link ./nodes/custom.mjs}. It is name of HTML tag or node instance that will be customized if you want it to be inherited from basic HTML element.
export type ENodeOptions = {
  attributes?: Attributes,
  children?: ENode | Component | (ENode | Component | string)[] | string,
  listeners?: ENodeEventListener | ENodeEventListener[],
  extend?: string | ENode,
}
