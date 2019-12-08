// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<label>** node with specific options.
 */
export default class Label extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('label', options)
  }
}
