// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<noscript>** node with specific options.
 */
export default class NoScript extends ENode {
  constructor(options?: ENodeOptions) {
    super('noscript', options)
  }
}
