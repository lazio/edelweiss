import MTNode from './mtn'

/**
 * Construct **<ol>** node with specific options.
 */
export default class Ol extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('ol', options)
  }
}
