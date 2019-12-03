import MTNode from './mtn'

/**
 * Construct **<em>** node with specific options.
 */
export default class Em extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('em', options)
  }
}
