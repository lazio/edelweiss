import MTNode from './mtn'

/**
 * Construct **<dialog>** node with specific options.
 */
export default class Dialog extends MTNode {
  /**
   * @param {boolean} [open] indicates that the dialog is active and available for interaction. When the [open] attribute is not set, the dialog shouldn't be shown to the user. The default value is `false`.
   * @param {MTNodeOptions} [options]
   */
  constructor(open = false, options) {
    super('dialog', options)
    this._attributes.open = open
  }
}
