// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<meta>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Meta extends ENode {
  constructor(options?: ENodeOptions) {
    super('meta', options)
    this._children = undefined
  }
}
