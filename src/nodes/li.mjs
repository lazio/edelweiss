// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<li>** node with specific options.
 */
export default class Li extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('li', {
      children,
      attributes,
      listeners
    })
  }
}
