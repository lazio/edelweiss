// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<summary>** node with specific options.
 */
export default class Summary extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('summary', options)
  }
}
