import MTNode from './mtn'

/**
 * Construct **<legend>** node with specific options.
 * May be only first node of the **<fieldset>** node and represents a caption for the content of its parent.
 */
export default class Legend extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('legend', options)
  }
}
