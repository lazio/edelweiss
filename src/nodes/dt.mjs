// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<dt>** node with specific options.
 */
export default class Dt extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('dt', options)
  }
}
