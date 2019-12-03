import MTNode from './mtn'

/**
 * Construct **<caption>** node with specific options.
 * May be only child of **<table>** node.
 */
export default class Caption extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('caption', options)
  }
}
