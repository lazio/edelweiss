// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<p>** node with specific options.
 */
export default class P extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('p', options)
  }
}
