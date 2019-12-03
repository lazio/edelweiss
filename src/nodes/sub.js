import MTNode from './mtn'

/**
 * Construct **<sub>** node with specific options.
 */
export default class Sub extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('sub', options)
  }
}
