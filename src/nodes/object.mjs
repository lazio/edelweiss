// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<object>** node with specific options.
 */
export default class Object extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('object', options)
  }
}
