// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<iframe>** node with specific options.
 */
export default class IFrame extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('iframe', options)
  }
}
