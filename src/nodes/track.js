import MTNode from './mtn'

/**
 * Construct **<track>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Track extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('track', options)
    this._children = undefined
  }
}
