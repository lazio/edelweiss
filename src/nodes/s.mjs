// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<s>** node with specific options.
 */
export default class S extends ENode {
  constructor(options?: ENodeOptions) {
    super('s', options)
  }
}
