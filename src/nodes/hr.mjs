// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<hr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Hr extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('hr', options)
    this._children = undefined
  }
}
