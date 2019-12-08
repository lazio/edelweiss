// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<embed>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Embed extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('embed', options)
    this._children = undefined
  }
}
