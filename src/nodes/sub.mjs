// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<sub>** node with specific options.
 */
export default class Sub extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('sub', options)
  }
}
