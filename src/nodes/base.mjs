// @flow

import type { MTNodeOptions } from './mtn.mjs'
import type { TargetType } from '../typedefs.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<base>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Base extends MTNode {
  constructor(href: string, target: ?TargetType, options?: MTNodeOptions) {
    super('base', options)
    this._attributes.href = href
    if (target) {
      this._attributes.target = target
    }
    this._children = undefined
  }
}
