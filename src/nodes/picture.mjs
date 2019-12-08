// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<picture>** node with specific options.
 */
export default class Picture extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('picture', options)
  }
}
