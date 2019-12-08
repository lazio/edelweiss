// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<u>** node with specific options.
 */
export default class U extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('u', options)
  }
}
