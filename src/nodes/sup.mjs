// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<sup>** node with specific options.
 */
export default class Sup extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('sup', options)
  }
}
