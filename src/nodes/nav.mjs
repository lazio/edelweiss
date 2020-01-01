// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<nav>** node with specific options.
 */
export default class Nav extends ENode {
  constructor(options?: ENodeOptions) {
    super('nav', options)
  }
}
