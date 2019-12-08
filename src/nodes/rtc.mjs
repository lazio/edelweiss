// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<rtc>** node with specific options.
 */
export default class Rtc extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('rtc', options)
  }
}
