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

  /** Executes before component builds. */
  beforeBuild(): void {}

  /** Must be overridden by child class. */
  build(): string | HTMLElement | (string | HTMLElement | Component)[] {
    return ''
  }

  /** Executes after component is builded. */
  afterBuild(): void {}

  _createNodes(): string | HTMLElement | (string | HTMLElement | Component)[] {
    this.beforeBuild()

    const buildedComponent = this.build()

    this.afterBuild()

    return buildedComponent
  }
}
