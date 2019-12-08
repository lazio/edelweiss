// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<address>** node with specific options.
 */
export default class Address extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('address', options)
  }
}
