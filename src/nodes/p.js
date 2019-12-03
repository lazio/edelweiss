import MTNode from './mtn'

/**
 * Construct **<p>** node with specific options.
 */
export default class P extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('p', options)
  }
}
