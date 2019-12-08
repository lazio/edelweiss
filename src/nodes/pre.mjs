// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<pre>** node with specific options.
 */
export default class Pre extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('pre', options)
  }
}
