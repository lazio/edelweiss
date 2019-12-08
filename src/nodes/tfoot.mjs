// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<tfoot>** node with specific options.
 */
export default class TFoot extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('tfoot', options)
  }
}
