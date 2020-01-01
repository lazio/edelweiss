// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<wbr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Wbr extends ENode {
  constructor(options?: ENodeOptions) {
    super('wbr', options)
    this._children = undefined
  }
}
