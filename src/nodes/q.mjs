// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<q>** node with specific options.
 */
export default class Q extends ENode {
  constructor(cite: string, options?: ENodeOptions) {
    super('q', options)
    this._attributes.cite = cite
  }
}
