// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<code>** node with specific options.
 */
export default class Code extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('code', options)
  }
}
