// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<footer>** node with specific options.
 */
export default class Footer extends ENode {
  constructor(options?: ENodeOptions) {
    super('footer', options)
  }
}
