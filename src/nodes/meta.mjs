// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<meta>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Meta extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('meta', options)
    this._children = undefined
  }
}
