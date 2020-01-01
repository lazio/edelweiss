// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<section>** node with specific options.
 */
export default class Section extends ENode {
  constructor(options?: ENodeOptions) {
    super('section', options)
  }
}
