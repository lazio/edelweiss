import MTNode from './mtn'

/**
 * Construct **<wbr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Wbr extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('wbr', options)
    this._children = undefined
  }
}
