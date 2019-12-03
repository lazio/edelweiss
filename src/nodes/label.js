import MTNode from './mtn'

/**
 * Construct **<label>** node with specific options.
 */
export default class Label extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('label', options)
  }
}
