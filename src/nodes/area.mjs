// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<area>** node with specific options.
 * This node can't have children.
 *
 * **<area>** node defines a hot-spot region on an image, and optionally associates
 * it with a hypertext link. This node is used only within a **<map>** node.
 */
export default class Area extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('area', {
      attributes,
      listeners
    })
  }
}
