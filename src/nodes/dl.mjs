// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<dl>** node with specific options.
 * The node encloses a list of groups of terms (specified using the **<dt>** node) and descriptions (provided by **<dd>** nodes).
 */
export default class Dl extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('dl', options)
  }
}
