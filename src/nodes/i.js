import MTNode from './mtn'

/**
 * Construct **<i>** node with specific options.
 */
export default class I extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('i', options)
  }
}
