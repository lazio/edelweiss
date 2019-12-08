// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<span>** node with specific options.
 */
export default class Span extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('span', options)
  }
}
