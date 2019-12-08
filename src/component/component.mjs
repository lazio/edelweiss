// @flow

import MTNode from '../nodes/mtn.mjs'

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default class Component {
  /** Must be overridden by child class. */
  build(): MTNode | MTNode[] { return [] }
}
