// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<small>** node with specific options.
 */
export default class Small extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('small', options)
  }
}
