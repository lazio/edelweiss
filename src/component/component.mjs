// @flow

import { loadCSS } from '../utils/styles.mjs'

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default class Component {
  /**
   * Executes always before component is building.
   */
  styles(): string | string[] {
    return ''
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
    const maybeCssPaths = this.styles()
    if (maybeCssPaths.length > 0) {
      Array.isArray(maybeCssPaths)
        ? maybeCssPaths.forEach(loadCSS)
        : loadCSS(maybeCssPaths)
    }

    await this.beforeBuild()
    const buildedComponent = await this.template()
    await this.afterBuild()

    return buildedComponent
  }
}
