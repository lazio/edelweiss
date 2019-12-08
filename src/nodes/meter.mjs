// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<meter>** node with specific options.
 */
export default class Meter extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('meter', options)
  }
}
