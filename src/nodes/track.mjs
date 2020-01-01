// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<track>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Track extends ENode {
  constructor(options?: ENodeOptions) {
    super('track', options)
    this._children = undefined
  }
}
