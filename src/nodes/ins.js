import MTNode from './mtn'

/**
 * Construct **<ins>** node with specific options.
 */
export default class Ins extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('ins', options)
  }
}
