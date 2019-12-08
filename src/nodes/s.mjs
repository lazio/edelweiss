// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<s>** node with specific options.
 */
export default class S extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('s', options)
  }
}
