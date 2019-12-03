import MTNode from './mtn'

/**
 * Construct **<small>** node with specific options.
 */
export default class Small extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('small', options)
  }
}
