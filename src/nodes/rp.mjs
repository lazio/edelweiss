// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<rp>** node with specific options.
 */
export default class Rp extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('rp', options)
  }
}
