// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<li>** node with specific options.
 */
export default class Li extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('li', options)
  }
}
