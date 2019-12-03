import MTNode from './mtn'

/**
 * Construct **<ruby>** node with specific options.
 */
export default class Ruby extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('ruby', options)
  }
}
