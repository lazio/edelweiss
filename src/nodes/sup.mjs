// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<sup>** node with specific options.
 */
export default class Sup extends ENode {
  constructor(options?: ENodeOptions) {
    super('sup', options)
  }
}
