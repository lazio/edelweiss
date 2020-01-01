// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dd>** node with specific options.
 */
export default class Dd extends ENode {
  constructor(options?: ENodeOptions) {
    super('dd', options)
  }
}
