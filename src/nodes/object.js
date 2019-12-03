import MTNode from './mtn'

/**
 * Construct **<object>** node with specific options.
 */
export default class Object extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('object', options)
  }
}
