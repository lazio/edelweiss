// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<header>** node with specific options.
 */
export default class Header extends ENode {
  constructor(options?: ENodeOptions) {
    super('header', options)
  }
}
