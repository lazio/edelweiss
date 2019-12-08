// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<canvas>** node with specific options.
 */
export default class Canvas extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('canvas', options)
  }
}
