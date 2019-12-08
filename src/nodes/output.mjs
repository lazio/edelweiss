// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<output>** node with specific options.
 */
export default class Output extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('output', options)
  }
}
