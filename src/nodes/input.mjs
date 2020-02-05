// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<input>** node with specific options.
 * This node can't have children.
 */
export default class Input extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('input', {
      attributes,
      listeners
    })
  }
}
