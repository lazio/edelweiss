// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ul>** node with specific options.
 * Children must be **<li>** nodes.
 */
export default class Ul extends ENode {
  constructor(options?: ENodeOptions) {
    super('ul', options)
  }
}
