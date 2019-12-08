// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<time>** node with specific options.
 */
export default class Time extends MTNode {
  /**
   * @throws {TypeError} if *datetime* isn't provided and its children isn't a valid date.
   */
  constructor(datetime: ?string, options?: MTNodeOptions) {
    super('time', options)
    if (!datetime) {
      if (options && options.children && typeof options.children !== 'string') {
        throw new TypeError('If the <time> node does not have a datetime attribute, it must not have any element descendants, but a time value as a string.')
      }
    } else {
      this._attributes.datetime = datetime
    }
  }
}
