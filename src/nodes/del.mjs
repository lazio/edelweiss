// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<del>** node with specific options.
 */
export default class Del extends ENode {
  constructor(options?: ENodeOptions) {
    super('del', options)
  }
}
