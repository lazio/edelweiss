// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<em>** node with specific options.
 */
export default class Em extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('em', options)
  }
}
