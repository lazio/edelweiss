// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rt>** node with specific options.
 * The **<rt>** node must always be contained within a **<ruby>** node.
 */
export default class Rt extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('rt', {
      children,
      attributes,
      listeners
    })
  }
}
