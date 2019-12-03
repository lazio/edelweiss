import MTNode from './mtn'

/**
 * Construct **<datalist>** node with specific options.
 */
export default class Datalist extends MTNode {
  /**
   * @param {string} id match **list** attribute of **<input>** node.
   * @param {MTNodeOptions} [options]
   */
  constructor(id, options) {
    super('datalist', options)
    this._attributes.id = id
  }
}
