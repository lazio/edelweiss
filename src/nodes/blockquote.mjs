// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<blockquote>** node with specific options.
 */
export default class Blockquote extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('blockquote', {
      children,
      attributes,
      listeners
    })
  }
}
