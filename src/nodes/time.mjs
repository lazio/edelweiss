// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<time>** node with specific options.
 */
export default class Time extends ENode {
  /**
   * @throws {TypeError} if *datetime* isn't provided and its children isn't a valid date.
   */
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('time', {
      children,
      attributes,
      listeners
    })
    if (attributes && !attributes.datetime) {
      if (children && typeof children !== 'string') {
        throw new TypeError('If the <time> node does not have a datetime attribute, it must not have any element descendants, but a time value as a string.')
      }
    }
  }
}
