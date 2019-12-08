// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<tbody>** node with specific options.
 */
export default class TBody extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('tbody', options)
  }
}
