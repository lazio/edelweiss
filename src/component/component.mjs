// @flow

import type { CssDeclaration } from '../utils/styles.mjs'

import { loadCSS } from '../utils/styles.mjs'

type ComponentOptions = {
  css?: CssDeclaration | CssDeclaration[],
}

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default class Component {
  constructor(options?: ComponentOptions = {}) {
    const { css } = options

    if (css) {
      Array.isArray(css) ? css.forEach(loadCSS) : loadCSS(css)
    }
  }

  // Executes before building of component.
  async beforeBuild(): Promise<void> {}

  async template(): Promise<string> {
    return ''
  }

  /**
   * Executes after component is builded, but not inserted into document.
   */
  async afterBuild(): Promise<void> {}

  async _createNodes(): Promise<string> {
    await this.beforeBuild()

    const buildedComponent = await this.template()

    await this.afterBuild()

    return buildedComponent
  }
}
