// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<colgroup>** node with specific options.
 */
export default class Colgroup extends ENode {
  constructor(options?: ENodeOptions) {
    super('colgroup', options)
  }
}
