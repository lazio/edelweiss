// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<aside>** node with specific options.
 */
export default class Aside extends ENode {
  constructor(options?: ENodeOptions) {
    super('aside', options)
  }
}
