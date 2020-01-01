// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<source>** node with specific options.
 * Specifies multiple media resources for the **<picture>**, the **<audio>** node, or the **<video>** node.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Source extends ENode {
  constructor(options?: ENodeOptions) {
    super('source', options)
    this._children = undefined
  }
}
