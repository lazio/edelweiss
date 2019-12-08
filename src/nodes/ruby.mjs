// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<ruby>** node with specific options.
 */
export default class Ruby extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('ruby', options)
  }
}
