// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<div>** node with specific options.
 */
export default class Div extends ENode {
  constructor(options?: ENodeOptions) {
    super('div', options)
  }
}
