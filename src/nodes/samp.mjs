// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<samp>** node with specific options.
 */
export default class Samp extends ENode {
  constructor(options?: ENodeOptions) {
    super('samp', options)
  }
}
