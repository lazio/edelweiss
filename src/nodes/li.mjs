// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<li>** node with specific options.
 */
export default class Li extends ENode {
  constructor(options?: ENodeOptions) {
    super('li', options)
  }
}
