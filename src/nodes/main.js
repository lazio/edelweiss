import MTNode from './mtn'

/**
 * Construct **<main>** node with specific options.
 */
export default class Main extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('main', options)
  }
}
