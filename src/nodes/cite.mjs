// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<cite>** node with specific options.
 */
export default class Cite extends ENode {
  constructor(options?: ENodeOptions) {
    super('cite', options)
  }
}
