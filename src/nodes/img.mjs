// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<img>** node with specific options.
 * This node can't have children.
 */
export default class Img extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('img', {
      attributes,
      listeners
    })
  }
}
