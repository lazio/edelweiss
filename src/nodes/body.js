import MTNode from './mtn'

/**
 * Construct **<body>** node with specific options.
 */
export default class Body extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('body', options)
  }
}
