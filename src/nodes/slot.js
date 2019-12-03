import MTNode from './mtn'

/**
 * Construct **<slot>** node with specific options.
 */
export default class Slot extends MTNode {
  /**
   * @param {string} name the slot's name.
   * @param {MTNodeOptions} [options]
   */
  constructor(name, options) {
    super('slot', options)
    this._attributes.name = name
  }
}
