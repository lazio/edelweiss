import MTNode from './mtn'

/**
 * Construct **<meter>** node with specific options.
 */
export default class Meter extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('meter', options)
  }
}
