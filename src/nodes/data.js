import MTNode from './mtn'

/**
 * Construct **<data>** node with specific options.
 */
export default class Data extends MTNode {
  /**
   * @param {string} value specifies the machine-readable translation of the content of the element.
   * @param {MTNodeOptions} [options]
   */
  constructor(value, options) {
    super('data', options)
    this._attributes.value = value
  }
}
