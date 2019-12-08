// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<select>** node with specific options.
 */
export default class Select extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('select', options)
  }
}
