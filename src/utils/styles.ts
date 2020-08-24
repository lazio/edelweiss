import Config from '../config';
import { alternation, tap } from '@fluss/core';
import {
  append,
  removeNode,
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
      append(
        document.head,
        createElement('link')
          .map((link) =>
            tap(link, (el) => {
              setAttribute(el, 'rel', 'stylesheet');
            })
          )
          .map((link) =>
            tap(link, (el) => {
              setAttribute(el, 'href', getCSSPath(name));
            })
          )
          .extract()
      );
      return document.head;
    }
  )();
}

export function unloadCSS(name: string): void {
  querySelector(`link[href="${getCSSPath(name)}"]`, document.head).map(
    removeNode
  );
}
