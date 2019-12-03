import MTNode from './mtn'

/**
 * Construct **<meta>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Meta extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('meta', options)
    this._children = undefined
  }
}
