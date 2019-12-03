import MTNode from './mtn'

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
