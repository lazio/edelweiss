// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ins>** node with specific options.
 */
export default class Ins extends ENode {
  constructor(options?: ENodeOptions) {
    super('ins', options)
  }
}
