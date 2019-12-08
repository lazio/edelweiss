// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<header>** node with specific options.
 */
export default class Header extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('header', options)
  }
}
