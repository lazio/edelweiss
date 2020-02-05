// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<link>** node with specific options.
 * This node can't have children.
 */
export default class Link extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('link', {
      attributes,
      listeners
    })
  }
}
