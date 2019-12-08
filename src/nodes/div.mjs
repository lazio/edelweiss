// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<div>** node with specific options.
 */
export default class Div extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('div', options)
  }
}
