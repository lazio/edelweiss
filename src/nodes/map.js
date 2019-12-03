import MTNode from './mtn'

/**
 * Construct **<map>** node with specific options.
 */
export default class Map extends MTNode {
  /**
   * @param {string} name gives the **<map>** a name so that it can be referenced. The attribute `must be present` and `must have a non-empty value with no space characters`. The value of the *name* attribute must not be a compatibility-caseless match for the value of the *name* attribute of another **<map>** node in the same document. If the *id* attribute is also specified, both attributes must have the same value.
   * @param {MTNodeOptions} [options]
   */
  constructor(name, options) {
    super('map', options)
    this._attributes.name = name
  }
}
