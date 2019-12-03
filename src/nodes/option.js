import MTNode from './mtn'

/**
 * Construct **<option>** node with specific options.
 */
export default class Option extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('option', options)
  }
}
