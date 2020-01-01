// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<canvas>** node with specific options.
 */
export default class Canvas extends ENode {
  constructor(options?: ENodeOptions) {
    super('canvas', options)
  }
}
