import { loadCSS } from '../utils/styles';
import { promiseOf } from '@fluss/core';

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export default abstract class Component {
  /** Executes always before component is building. */
  styles(): string | Array<string> {
    return '';
  }

  /** Executes before building of component. */
  beforeBuild(): Promise<void> | void {}

  abstract template(): Promise<string> | string;

  /** Executes after component is builded, but not inserted into document. */
  afterBuild(): Promise<void> | void {}

  async _createNodes(): Promise<string> {
    const maybeCssPaths = this.styles();
    if (maybeCssPaths.length > 0) {
      Array.isArray(maybeCssPaths)
        ? maybeCssPaths.forEach(loadCSS)
        : loadCSS(maybeCssPaths);
    }

    await promiseOf(this.beforeBuild());
    const buildedComponent = await promiseOf(this.template());
    await promiseOf(this.afterBuild());

    return buildedComponent;
  }
}
