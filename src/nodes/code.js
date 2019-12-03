import MTNode from './mtn'

/**
 * Construct **<code>** node with specific options.
 */
export default class Code extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('code', options)
  }
}
