import MTNode from './mtn'

/**
 * Construct **<summary>** node with specific options.
 */
export default class Summary extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('summary', options)
  }
}
