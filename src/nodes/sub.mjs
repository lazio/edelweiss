// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<sub>** node with specific options.
 */
export default class Sub extends ENode {
  constructor(options?: ENodeOptions) {
    super('sub', options)
  }
}
