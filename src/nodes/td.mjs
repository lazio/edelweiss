// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<td>** node with specific options.
 */
export default class Td extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('td', options)
  }
}
