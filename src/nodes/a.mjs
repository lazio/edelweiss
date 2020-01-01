// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<a>** node with specific options.
 */
export default class A extends ENode {
  constructor(href: string, options?: ENodeOptions) {
    super('a', options)
    this._attributes.href = href
  }
}
