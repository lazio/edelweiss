// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Define target value for links.
 */
export type TargetType = '_blank' | '_self' | '_parent' | '_top'

/**
 * Construct **<base>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Base extends ENode {
  constructor(href: string, target: ?TargetType, options?: ENodeOptions) {
    super('base', options)
    this._attributes.href = href
    if (target) {
      this._attributes.target = target
    }
    this._children = undefined
  }
}
