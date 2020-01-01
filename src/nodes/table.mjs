// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<table>** node with specific options.
 */
export default class Table extends ENode {
  constructor(options?: ENodeOptions) {
    super('table', options)
  }
}
