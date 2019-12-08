// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<ol>** node with specific options.
 */
export default class Ol extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('ol', options)
  }
}
