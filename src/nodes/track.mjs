// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<track>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Track extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('track', options)
    this._children = undefined
  }
}
