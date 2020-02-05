// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rp>** node with specific options.
 */
export default class Rp extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('rp', {
      children,
      attributes,
      listeners
    })
  }
}
