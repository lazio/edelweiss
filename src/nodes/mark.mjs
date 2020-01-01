// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<mark>** node with specific options.
 */
export default class Mark extends ENode {
  constructor(options?: ENodeOptions) {
    super('mark', options)
  }
}
