// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<table>** node with specific options.
 */
export default class Table extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('table', options)
  }
}
