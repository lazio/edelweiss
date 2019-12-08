// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<bdi>** node with specific options.
 */
export default class Bdi extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('bdi', options)
  }
}
