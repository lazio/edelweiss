// @flow

import type ENode from '../nodes/en.mjs'
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
  build(): string | ENode | Component | (string | Component | ENode)[] {
    return ''
  }

  /** Executes after component is builded. */
  afterBuild(): void {}

  _createNodes(): string | ENode | Component | (string | Component | ENode)[] {
    this.beforeBuild()

    const buildedComponent = this.build()

    this.afterBuild()

    return buildedComponent
  }
}
