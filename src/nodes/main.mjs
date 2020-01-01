// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<main>** node with specific options.
 */
export default class Main extends ENode {
  constructor(options?: ENodeOptions) {
    super('main', options)
  }
}
