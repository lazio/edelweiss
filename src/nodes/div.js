import MTNode from './mtn'

/**
 * Construct **<div>** node with specific options.
 */
export default class Div extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('div', options)
  }
}
