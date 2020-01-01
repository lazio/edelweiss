// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<tr>** node with specific options.
 */
export default class Tr extends ENode {
  constructor(options?: ENodeOptions) {
    super('tr', options)
  }
}
