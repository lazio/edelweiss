import MTNode from './mtn'

/**
 * Construct **<s>** node with specific options.
 */
export default class S extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('s', options)
  }
}
