// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<tbody>** node with specific options.
 */
export default class TBody extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('tbody', {
      children,
      attributes,
      listeners
    })
  }
}
