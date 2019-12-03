import MTNode from './mtn'

/**
 * Construct **<samp>** node with specific options.
 */
export default class Samp extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('samp', options)
  }
}
