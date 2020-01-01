// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<select>** node with specific options.
 */
export default class Select extends ENode {
  constructor(options?: ENodeOptions) {
    super('select', options)
  }
}
