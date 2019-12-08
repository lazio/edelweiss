// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<strong>** node with specific options.
 */
export default class Strong extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('strong', options)
  }
}
