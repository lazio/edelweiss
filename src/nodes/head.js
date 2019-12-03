import MTNode from './mtn'

/**
 * Construct **<head>** node with specific options.
 */
export default class Head extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('head', options)
  }
}
