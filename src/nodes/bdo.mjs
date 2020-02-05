// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<bdo>** node with specific options.
 */
export default class Bdo extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('bdo', {
      children,
      attributes,
      listeners
    })
  }
}
