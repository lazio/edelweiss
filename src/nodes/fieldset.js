import MTNode from './mtn'

/**
 * Construct **<fieldset>** node with specific options.
 */
export default class Fieldset extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('fieldset', options)
  }
}
