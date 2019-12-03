import MTNode from './mtn'

/**
 * Construct **<html>** node with specific options.
 */
export default class Html extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('html', options)
  }
}
