// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<tr>** node with specific options.
 */
export default class Tr extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('tr', options)
  }
}
