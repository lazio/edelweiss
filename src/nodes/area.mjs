// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<area>** node with specific options.
 * This node can't have children. If you add ones, they will be refused.
 *
 * **<area>** node defines a hot-spot region on an image, and optionally associates it with a hypertext link. This node is used only within a **<map>** node.
 */
export default class Area extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('area', options)
    this._children = undefined
  }
}
