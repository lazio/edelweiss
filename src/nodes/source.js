import MTNode from './mtn'

/**
 * Construct **<source>** node with specific options.
 * Specifies multiple media resources for the **<picture>**, the **<audio>** node, or the **<video>** node.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Source extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('source', options)
    this._children = undefined
  }
}
