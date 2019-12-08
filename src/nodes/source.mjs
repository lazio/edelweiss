// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<source>** node with specific options.
 * Specifies multiple media resources for the **<picture>**, the **<audio>** node, or the **<video>** node.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Source extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('source', options)
    this._children = undefined
  }
}
