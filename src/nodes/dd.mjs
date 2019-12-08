// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<dd>** node with specific options.
 */
export default class Dd extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('dd', options)
  }
}
