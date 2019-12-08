// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<kbd>** node with specific options.
 */
export default class Kbd extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('kbd', options)
  }
}
