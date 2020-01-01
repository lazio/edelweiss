// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rtc>** node with specific options.
 */
export default class Rtc extends ENode {
  constructor(options?: ENodeOptions) {
    super('rtc', options)
  }
}
