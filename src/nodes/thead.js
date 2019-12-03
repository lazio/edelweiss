import MTNode from './mtn'

/**
 * Construct **<thead>** node with specific options.
 */
export default class THead extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('thead', options)
  }
}
