// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<track>** node with specific options.
 * This node can't have children.
 */
export default class Track extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('track', {
      attributes,
      listeners
    })
  }
}
