// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<figcaption>** node with specific options.
 */
export default class Figcaption extends ENode {
  constructor(options?: ENodeOptions) {
    super('figcaption', options)
  }
}
