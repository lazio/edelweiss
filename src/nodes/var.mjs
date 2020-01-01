// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<var>** node with specific options.
 */
export default class Var extends ENode {
  constructor(options?: ENodeOptions) {
    super('var', options)
  }
}
