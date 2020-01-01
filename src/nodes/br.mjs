// @flow

import ENode from './en.mjs'

/**
 * Construct **<br>** node.
 */
export default class Br extends ENode {
  /**
   * Produce node that represents a line break in text.
   */
  constructor() {
    super('br')
  }
}
