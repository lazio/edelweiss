// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<blockquote>** node with specific options.
 */
export default class Blockquote extends ENode {
  constructor(cite: ?string, options?: ENodeOptions) {
    super('blockquote', options)
    if (cite) {
      this._attributes.cite = cite
    }
  }
}
