// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<th>** node with specific options.
 */
export default class Th extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('th', options)
  }
}
