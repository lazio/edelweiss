// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ol>** node with specific options.
 */
export default class Ol extends ENode {
  constructor(options?: ENodeOptions) {
    super('ol', options)
  }
}
