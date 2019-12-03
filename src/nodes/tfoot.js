import MTNode from './mtn'

/**
 * Construct **<tfoot>** node with specific options.
 */
export default class TFoot extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('tfoot', options)
  }
}
