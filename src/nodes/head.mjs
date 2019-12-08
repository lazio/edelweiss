// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<head>** node with specific options.
 */
export default class Head extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('head', options)
  }
}
