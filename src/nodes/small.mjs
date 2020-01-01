// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<small>** node with specific options.
 */
export default class Small extends ENode {
  constructor(options?: ENodeOptions) {
    super('small', options)
  }
}
