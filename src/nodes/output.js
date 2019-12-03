import MTNode from './mtn'

/**
 * Construct **<output>** node with specific options.
 */
export default class Output extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('output', options)
  }
}
