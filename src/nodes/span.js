import MTNode from './mtn'

/**
 * Construct **<span>** node with specific options.
 */
export default class Span extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('span', options)
  }
}
