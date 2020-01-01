// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<b>** node with specific options.
 */
export default class B extends ENode {
  constructor(options?: ENodeOptions) {
    super('b', options)
  }
}
