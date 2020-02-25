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
  beforeBuild(): void {}

  template(): string {
    return ''
  }

  /**
   * Executes after component is builded, but not inserted into document.
   */
  afterBuild(): void {}

  _createNodes(): string {
    this.beforeBuild()

    const buildedComponent = this.template()

    this.afterBuild()

    return buildedComponent
  }
}
