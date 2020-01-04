// @flow

import ENode from '../nodes/en.mjs'
import { loadCSS } from '../utils/styles.mjs'

type ComponentOptions = {
  css?: string | string[]
}

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default class Component {
  constructor(options?: ComponentOptions = {}) {
    const { css } = options

    if (css) {
      typeof css === 'string'
        ? loadCSS(css)
        : css.forEach(loadCSS)
    }
  }

  /** Executes before component builds. */
  async beforeBuild(): Promise<void> {}

  /** Must be overridden by child class. */
  build(): ENode | ENode[] {
    return []
  }

  /** Executes after component is builded. */
  async afterBuild(): Promise<void> {}

  async _createNodes(): Promise<ENode | ENode[]> {
    await this.beforeBuild()

    const buildedComponent = this.build()

    await this.afterBuild()

    return buildedComponent
  }
}
