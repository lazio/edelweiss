// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<option>** node with specific options.
 */
export default class Option extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('option', options)
  }
}
