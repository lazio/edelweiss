import MTNode from './mtn'

/**
 * Construct **<button>** node with specific options.
 */
export default class Button extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('button', options)
  }
}
