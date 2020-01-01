// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<thead>** node with specific options.
 */
export default class THead extends ENode {
  constructor(options?: ENodeOptions) {
    super('thead', options)
  }
}
