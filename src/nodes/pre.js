import MTNode from './mtn'

/**
 * Construct **<pre>** node with specific options.
 */
export default class Pre extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('pre', options)
  }
}
