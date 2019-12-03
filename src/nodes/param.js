import MTNode from './mtn'

/**
 * Construct **<param>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Param extends MTNode {
  /**
   * @param {string} name name of the parameter.
   * @param {string} value the value of the parameter.
   * @param {MTNodeOptions} [options]
   */
  constructor(name, value, options) {
    super('param', options)
    this._attributes.name = name
    this._attributes.value = value
    this._children = undefined
  }
}
