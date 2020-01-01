// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<object>** node with specific options.
 */
export default class Object extends ENode {
  constructor(options?: ENodeOptions) {
    super('object', options)
  }
}
