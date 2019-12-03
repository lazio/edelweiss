import MTNode from './mtn'

/**
 * Construct **<del>** node with specific options.
 */
export default class Del extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('del', options)
  }
}
