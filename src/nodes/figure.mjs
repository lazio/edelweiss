// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<figure>** node with specific options.
 */
export default class Figure extends ENode {
  constructor(options?: ENodeOptions) {
    super('figure', options)
  }
}
