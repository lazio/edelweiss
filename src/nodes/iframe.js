import MTNode from './mtn'

/**
 * Construct **<iframe>** node with specific options.
 */
export default class IFrame extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('iframe', options)
  }
}
