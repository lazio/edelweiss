import MTNode from './mtn'

/**
 * Construct **<textarea>** node with specific options.
 */
export default class TextArea extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('textarea', options)
  }
}
