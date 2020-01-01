// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<head>** node with specific options.
 */
export default class Head extends ENode {
  constructor(options?: ENodeOptions) {
    super('head', options)
  }
}
