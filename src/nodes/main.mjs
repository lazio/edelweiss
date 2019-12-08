// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<main>** node with specific options.
 */
export default class Main extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('main', options)
  }
}
