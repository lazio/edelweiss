// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<q>** node with specific options.
 */
export default class Q extends MTNode {
  constructor(cite: string, options?: MTNodeOptions) {
    super('q', options)
    this._attributes.cite = cite
  }
}
