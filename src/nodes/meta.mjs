// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<meta>** node with specific options.
 * This node can't have children.
 */
export default class Meta extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('meta', {
      attributes,
      listeners
    })
  }
}
