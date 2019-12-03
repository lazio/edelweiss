import MTNode from './mtn'

/**
 * Construct **<embed>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Embed extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('embed', options)
    this._children = undefined
  }
}
