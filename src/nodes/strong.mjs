// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<strong>** node with specific options.
 */
export default class Strong extends ENode {
  constructor(options?: ENodeOptions) {
    super('strong', options)
  }
}
