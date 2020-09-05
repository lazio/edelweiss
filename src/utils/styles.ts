import Config from '../config';
import { alternation } from '@fluss/core';
import {
  removeNode,
  appendNodes,
  setAttribute,
  querySelector,
  createElement,
} from '@fluss/web';

function getCSSPath(name: string): string {
  return `${Config.cssRootFolder}${name}${/.+\.css$/.test(name) ? '' : '.css'}`;
}

/**
 * Loads CSS file by adding <link> to <head>.
 * [name] is name of the file with or without extension.
 * By default bundler will set all styles in /public/styles/ folder.
 */
export function loadCSS(name: string): void {
  alternation(
    () =>
      querySelector(
        `link[href="${getCSSPath(name)}"]`,
        document.head
      ).extract(),
    () => {
      appendNodes(
        document.head,
        createElement('link')
          .map((link) => {
            setAttribute(link, 'rel', 'stylesheet');
            return link;
          })
          .map((link) => {
            setAttribute(link, 'href', getCSSPath(name));
            return link;
          })
          .extract()
      );
      return null;
    }
  )();
}

export function unloadCSS(name: string): void {
  querySelector(`link[href="${getCSSPath(name)}"]`, document.head).map(
    removeNode
  );
}
