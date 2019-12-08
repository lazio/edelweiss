// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<wbr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Wbr extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('wbr', options)
    this._children = undefined
  }
}
