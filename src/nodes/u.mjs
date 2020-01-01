// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<u>** node with specific options.
 */
export default class U extends ENode {
  constructor(options?: ENodeOptions) {
    super('u', options)
  }
}
