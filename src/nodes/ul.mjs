// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<ul>** node with specific options.
 * Children must be **<li>** nodes.
 */
export default class Ul extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('ul', options)
  }
}
