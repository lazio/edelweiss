import MTNode from './mtn'

/**
 * Construct **<dt>** node with specific options.
 */
export default class Dt extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('dt', options)
  }
}
