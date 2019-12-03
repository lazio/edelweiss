import MTNode from './mtn'

/**
 * Construct **<section>** node with specific options.
 */
export default class Section extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('section', options)
  }
}
