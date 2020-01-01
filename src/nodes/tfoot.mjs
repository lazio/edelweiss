// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<tfoot>** node with specific options.
 */
export default class TFoot extends ENode {
  constructor(options?: ENodeOptions) {
    super('tfoot', options)
  }
}
