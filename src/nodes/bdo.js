import MTNode from './mtn'

/**
 * Construct **<bdo>** node with specific options.
 */
export default class Bdo extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('bdo', options)
  }
}
