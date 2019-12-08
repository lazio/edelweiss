// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<b>** node with specific options.
 */
export default class B extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('b', options)
  }
}
