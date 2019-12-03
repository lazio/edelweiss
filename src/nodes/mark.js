import MTNode from './mtn'

/**
 * Construct **<mark>** node with specific options.
 */
export default class Mark extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('mark', options)
  }
}
