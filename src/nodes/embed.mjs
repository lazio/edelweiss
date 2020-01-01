// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<embed>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Embed extends ENode {
  constructor(options?: ENodeOptions) {
    super('embed', options)
    this._children = undefined
  }
}
