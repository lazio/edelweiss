// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<aside>** node with specific options.
 */
export default class Aside extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('aside', options)
  }
}
