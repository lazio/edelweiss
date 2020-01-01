// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<body>** node with specific options.
 */
export default class Body extends ENode {
  constructor(options?: ENodeOptions) {
    super('body', options)
  }
}
