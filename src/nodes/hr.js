import MTNode from './mtn'

/**
 * Construct **<hr>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Hr extends MTNode {
  /**
   * Represents a thematic break between paragraph-level elements.
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('hr', options)
    this._children = undefined
  }
}
