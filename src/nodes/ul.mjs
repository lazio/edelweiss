// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ul>** node with specific options.
 * Children must be **<li>** nodes.
 */
export default class Ul extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('ul', {
      children,
      attributes,
      listeners
    })
  }
}
