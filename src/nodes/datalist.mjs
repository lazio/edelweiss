// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<datalist>** node with specific options.
 */
export default class Datalist extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('datalist', {
      children,
      attributes,
      listeners
    })
  }
}
