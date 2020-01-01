// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<hr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Hr extends ENode {
  constructor(options?: ENodeOptions) {
    super('hr', options)
    this._children = undefined
  }
}
