import MTNode from './mtn'

/**
 * Construct **<optgroup>** node with specific options.
 */
export default class OptGroup extends MTNode {
  /**
   * @param {string} label the name of the group of options, which the browser can use when labeling the options in the user interface.
   * @param {boolean} [disabled=false] define if none of the items in this option group is selectable.
   * @param {MTNodeOptions} [options]
   */
  constructor(label, disabled = false, options) {
    super('optgroup', options)
    this._attributes.label = label
    this._attributes.disabled = disabled
  }
}
