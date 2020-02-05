// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dialog>** node with specific options.
 */
export default class Dialog extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('dialog', {
      children,
      attributes,
      listeners
    })
  }
}
