// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<area>** node with specific options.
 * This node can't have children. If you add ones, they will be refused.
 *
 * **<area>** node defines a hot-spot region on an image, and optionally associates it with a hypertext link. This node is used only within a **<map>** node.
 */
export default class Area extends ENode {
  constructor(options?: ENodeOptions) {
    super('area', options)
    this._children = undefined
  }
}
