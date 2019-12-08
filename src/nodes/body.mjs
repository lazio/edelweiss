// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<body>** node with specific options.
 */
export default class Body extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('body', options)
  }
}
