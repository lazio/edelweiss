// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<td>** node with specific options.
 */
export default class Td extends ENode {
  constructor(options?: ENodeOptions) {
    super('td', options)
  }
}
