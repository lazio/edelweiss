import MTNode from './mtn'

/**
 * Construct **<kbd>** node with specific options.
 */
export default class Kbd extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('kbd', options)
  }
}
