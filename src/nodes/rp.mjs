// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rp>** node with specific options.
 */
export default class Rp extends ENode {
  constructor(options?: ENodeOptions) {
    super('rp', options)
  }
}
