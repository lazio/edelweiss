import MTNode from './mtn'

/**
 * Construct **<select>** node with specific options.
 */
export default class Select extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('select', options)
  }
}
