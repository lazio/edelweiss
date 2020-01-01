// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<p>** node with specific options.
 */
export default class P extends ENode {
  constructor(options?: ENodeOptions) {
    super('p', options)
  }
}
