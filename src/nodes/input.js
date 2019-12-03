import MTNode from './mtn'

/**
 * Construct **<input>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Input extends MTNode {
  /**
   * @param {InputType} type type of **<input>**.
   * @param {MTNodeOptions} [options]
   */
  constructor(type, options) {
    super('input', options)
    this._attributes.type = type
    this._children = undefined
  }
}
