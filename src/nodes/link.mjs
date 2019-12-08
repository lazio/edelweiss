// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<link>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Link extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('link', options)
    this._children = undefined
  }
}
