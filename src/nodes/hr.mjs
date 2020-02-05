// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<hr>** node with specific options.
 * This node can't have children.
 */
export default class Hr extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('hr', {
      attributes,
      listeners
    })
  }
}
