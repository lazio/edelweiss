// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<caption>** node with specific options.
 * May be only child of **<table>** node.
 */
export default class Caption extends ENode {
  constructor(options?: ENodeOptions) {
    super('caption', options)
  }
}
