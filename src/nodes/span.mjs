// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<span>** node with specific options.
 */
export default class Span extends ENode {
  constructor(options?: ENodeOptions) {
    super('span', options)
  }
}
