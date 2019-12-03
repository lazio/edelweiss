import MTNode from './mtn'

/**
 * Construct **<title>** node with specific options.
 */
export default class Title extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   * @throws {Error} if *options.children* isn't type of string.
   */
  constructor(options) {
    super('title', options)
    if (options.children && typeof options.children !== 'string') {
      throw new TypeError(`Children of the <title> node must be string, but got ${typeof options.children}`)
    }
  }
}
