import MTNode from './mtn'

/**
 * Construct **<address>** node with specific options.
 */
export default class Address extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('address', options)
  }
}
