// @flow

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

// Object that describe event listener consumed by **MTNode** object.
export type MTNodeEventListener = {
  type: EventType,
  listener: EventListener,
}

/**
 * Main class that creates DOM node.
 */
export default class MTNode {
  /** @private */
  +_tag: string
  /**  @private */
  +_attributes: Attributes
  /**  @private */
  +_children: MTNode | MTNode[] | string | typeof undefined
  /** @private */
  +_listeners: MTNodeEventListener | MTNodeEventListener[] | typeof undefined

  /**
   * Creates node that represent DOM's element.
   * @throws {Error} if **tag** isn't provided.
   */
  constructor(tag: string, options?: MTNodeOptions = {}) {
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
      if (this._children instanceof Array) {
        this._children.forEach((child: MTNode) => {
          element.append(child.createElement())
        })
      } else if (this._children instanceof MTNode) {
        element.append(this._children.createElement())
      } else {
        element.append(this._children)
      }
    }

    if (this._listeners) {
      if (this._listeners instanceof Array) {
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

// Options that define parameters for creating **MTNode** object.
//
// *extend* is used while creating custom node {@link ./nodes/custom.mjs}. It is name of HTML tag or node instance that will be customized if you want it to be inherited from basic HTML element.
export type MTNodeOptions = {
  attributes?: Attributes,
  children?: MTNode | MTNode[] | string,
  listeners?: MTNodeEventListener | MTNodeEventListener[],
  extend?: string | MTNode,
}
