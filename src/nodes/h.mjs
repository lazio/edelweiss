// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<h(some-number)>** node with specific options.
 */
export default class H extends MTNode {
  /**
   * @throws {Error} when [importance] is less than 1 or bigger that 6.
   */
  constructor(importance: number, options?: MTNodeOptions) {
    super(`h${importance}`, options)
    if (importance < 1 || importance > 6) {
      throw new Error(`The importance of heading must be in range from 1 to 6, but got: ${importance}`)
    }
  }
}
