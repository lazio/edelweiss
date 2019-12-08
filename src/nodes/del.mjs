// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<del>** node with specific options.
 */
export default class Del extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('del', options)
  }
}
