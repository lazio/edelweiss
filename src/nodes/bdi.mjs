// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<bdi>** node with specific options.
 */
export default class Bdi extends ENode {
  constructor(options?: ENodeOptions) {
    super('bdi', options)
  }
}
