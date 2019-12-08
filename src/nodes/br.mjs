// @flow

import MTNode from './mtn.mjs'

/**
 * Construct **<br>** node.
 */
export default class Br extends MTNode {
  /**
   * Produce node that represents a line break in text.
   */
  constructor() {
    super('br')
  }
}
