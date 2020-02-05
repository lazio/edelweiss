// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<col>** node with specific options.
 * This node can't have children.
 *
 * Defines a column within a table and is used for defining common semantics on all
 * common cells. It is generally found within a **<colgroup>** node.
 */
export default class Col extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('col', {
      attributes,
      listeners
    })
  }
}
