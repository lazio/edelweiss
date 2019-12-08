// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<col>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 *
 * Defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a **<colgroup>** node.
 */
export default class Col extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('col', options)
    this._children = undefined
  }
}
