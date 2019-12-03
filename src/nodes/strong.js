import MTNode from './mtn'

/**
 * Construct **<strong>** node with specific options.
 */
export default class Strong extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('strong', options)
  }
}
