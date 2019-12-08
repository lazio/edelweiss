// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<bdo>** node with specific options.
 */
export default class Bdo extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('bdo', options)
  }
}
