import MTNode from './mtn'

/**
 * Construct **<dd>** node with specific options.
 */
export default class Dd extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('dd', options)
  }
}
