import MTNode from './mtn'

/**
 * Construct **<rp>** node with specific options.
 */
export default class Rp extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('rp', options)
  }
}
