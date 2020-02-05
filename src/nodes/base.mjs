// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<base>** node with specific options.
 * This node can't have children.
 */
export default class Base extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('base', {
      attributes,
      listeners
    })
  }
}
