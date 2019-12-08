// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<nav>** node with specific options.
 */
export default class Nav extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('nav', options)
  }
}
