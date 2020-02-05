// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<embed>** node with specific options.
 * This node can't have children.
 */
export default class Embed extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('embed', {
      attributes,
      listeners
    })
  }
}
