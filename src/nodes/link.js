import MTNode from './mtn'

/**
 * Construct **<link>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Link extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('link', options)
    this._children = undefined
  }
}
