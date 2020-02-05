// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<source>** node with specific options.
 * Specifies multiple media resources for the **<picture>**, the **<audio>** node, or the **<video>** node.
 * This node can't have children.
 */
export default class Source extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('source', {
      attributes,
      listeners
    })
  }
}
