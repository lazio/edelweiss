// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<var>** node with specific options.
 */
export default class Var extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('var', options)
  }
}
