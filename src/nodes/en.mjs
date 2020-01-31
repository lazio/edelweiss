// @flow

import Component from '../component/component.mjs'
import { normalizeStyles } from '../utils/styles.mjs'
import type { Styles } from '../utils/styles.mjs'

export type Attributes = {
  style?: Styles,
  class?: string,
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
export type ENodeEventListenersObject = {
  [type: EventType]: EventListener,
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
  +_children: string
    | ENode
    | Component
    | (string | ENode | Component)[]
    | typeof undefined

  /** @private */
  +_listeners: ENodeEventListenersObject | typeof undefined

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
  async createElement(): Promise<HTMLElement> {
    const element = document.createElement(this._tag)
    return this._attachOptionsTo(element)
  }

  /**
   * Attach listeners, sets attributes and add children to *element* parameter.
   */
  async _attachOptionsTo(element: HTMLElement): Promise<HTMLElement> {
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
      attach(element, this._children)
    }

    if (this._listeners) {
      const types = Object.keys(this._listeners)
      types.forEach(eventType => {
        // $FlowFixMe
        element.addEventListener(eventType, this._listeners[eventType])
      })
    }

    return Promise.resolve(element)
  }
}

// Options that define parameters for creating **ENode** object.
//
// *extend* is used while creating custom node {@link ./nodes/custom.mjs}. It is name of HTML tag or node instance that will be customized if you want it to be inherited from basic HTML element.
export type ENodeOptions = {
  attributes?: Attributes,
  children?: ENode | Component | (ENode | Component | string)[] | string,
  listeners?: ENodeEventListenersObject,
  extend?: string | ENode,
}

/**
 * Attaches builded DOM elements into parent element.
 */
export async function attach(
  to: HTMLElement,
  nodes: string | ENode | Component | (string | ENode | Component)[]
) {
  if (Array.isArray(nodes)) {
    nodes.forEach(node => attach(to, node))
  } else {
    if (nodes instanceof Component) {
      const builded = await nodes._createNodes()
      Array.isArray(builded)
        ? builded.forEach(node => attach(to, node))
        : attach(to, builded)
    } else if (nodes instanceof ENode) {
      to.append(await nodes.createElement())
    } else {
      to.append(nodes)
    }
  }
}
