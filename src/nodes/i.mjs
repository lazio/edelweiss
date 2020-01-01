// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<i>** node with specific options.
 */
export default class I extends ENode {
  constructor(options?: ENodeOptions) {
    super('i', options)
  }
}
