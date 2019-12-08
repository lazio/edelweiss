// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<ins>** node with specific options.
 */
export default class Ins extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('ins', options)
  }
}
