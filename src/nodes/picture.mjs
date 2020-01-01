// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<picture>** node with specific options.
 */
export default class Picture extends ENode {
  constructor(options?: ENodeOptions) {
    super('picture', options)
  }
}
