import MTNode from './mtn'

/**
 * Construct **<time>** node with specific options.
 */
export default class Time extends MTNode {
  /**
   * @param {string} [datetime] indicates the time and/or date of the node and must be in one of the formats described [here (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time).
   * @param {MTNodeOptions} [options]
   * @throws {TypeError} if *datetime* isn't provided and its children isn't a valid date.
   */
  constructor(datetime, options) {
    super('time', options)
    if (!datetime) {
      if (options.children && typeof options.children !== 'string') {
        throw new TypeError('If the <time> node does not have a datetime attribute, it must not have any element descendants, but a time value as a string.')
      }
    } else {
      this._attributes.datetime = datetime
    }
  }
}
