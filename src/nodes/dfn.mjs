// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dfn>** node with specific options.
 */
export default class Dfn extends ENode {
  constructor(options?: ENodeOptions) {
    super('dfn', options)
  }
}
