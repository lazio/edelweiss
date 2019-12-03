import MTNode from './mtn'

/**
 * Construct **<th>** node with specific options.
 */
export default class Th extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('th', options)
  }
}
