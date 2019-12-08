// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<blockquote>** node with specific options.
 */
export default class Blockquote extends MTNode {
  constructor(cite: ?string, options?: MTNodeOptions) {
    super('blockquote', options)
    if (cite) {
      this._attributes.cite = cite
    }
  }
}
