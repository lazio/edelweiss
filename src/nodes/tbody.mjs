// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<tbody>** node with specific options.
 */
export default class TBody extends ENode {
  constructor(options?: ENodeOptions) {
    super('tbody', options)
  }
}
