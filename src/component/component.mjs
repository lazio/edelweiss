// @flow

import MTNode from '../nodes/mtn.mjs'

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default class Component {
  /** Executes before component builds. */
  async beforeBuild(): Promise<void> {}

  /** Must be overridden by child class. */
  build(): MTNode | MTNode[] {
    return []
  }

  /** Executes after component is builded. */
  async afterBuild(): Promise<void> {}

  async _render(): Promise<MTNode | MTNode[]> {
    await this.beforeBuild()

    const buildedComponent = this.build()

    await this.afterBuild()

    return buildedComponent
  }
}
