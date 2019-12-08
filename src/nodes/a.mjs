// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<a>** node with specific options.
 */
export default class A extends MTNode {
  constructor(href: string, options?: MTNodeOptions) {
    super('a', options)
    this._attributes.href = href
  }
}
