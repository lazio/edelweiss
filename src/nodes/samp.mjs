// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<samp>** node with specific options.
 */
export default class Samp extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('samp', options)
  }
}
