// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<kbd>** node with specific options.
 */
export default class Kbd extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('kbd', {
      children,
      attributes,
      listeners
    })
  }
}
