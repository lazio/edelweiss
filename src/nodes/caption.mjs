// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<caption>** node with specific options.
 * May be only child of **<table>** node.
 */
export default class Caption extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('caption', options)
  }
}
