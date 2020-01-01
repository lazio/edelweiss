// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<link>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Link extends ENode {
  constructor(options?: ENodeOptions) {
    super('link', options)
    this._children = undefined
  }
}
