// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<i>** node with specific options.
 */
export default class I extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('i', options)
  }
}
