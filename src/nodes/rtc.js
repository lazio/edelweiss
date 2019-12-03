import MTNode from './mtn'

/**
 * Construct **<rtc>** node with specific options.
 */
export default class Rtc extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('rtc', options)
  }
}
