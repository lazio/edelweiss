// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<mark>** node with specific options.
 */
export default class Mark extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('mark', options)
  }
}
