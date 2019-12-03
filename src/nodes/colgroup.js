import MTNode from './mtn'

/**
 * Construct **<colgroup>** node with specific options.
 */
export default class Colgroup extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('colgroup', options)
  }
}
