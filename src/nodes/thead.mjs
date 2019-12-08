// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<thead>** node with specific options.
 */
export default class THead extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('thead', options)
  }
}
