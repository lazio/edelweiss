import MTNode from './mtn'

/**
 * Construct **<li>** node with specific options.
 */
export default class Li extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('li', options)
  }
}
