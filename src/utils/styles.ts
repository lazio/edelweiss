import Config from '../config';
import { alternation, tap } from '@fluss/core';
import { querySelector, createElement, setAttribute, append } from '@fluss/web';

/**
 * Loads CSS file by adding <link> to <head>.
 * [name] is name of the file with or without extension.
 * By default bundler will set all styles in /public/styles/ folder.
 */
export function loadCSS(name: string): void {
  const cssPath = `${Config.cssRootFolder}${name}${
    /.+\.css$/.test(name) ? '' : '.css'
  }`;

  alternation(
    () => querySelector(`link[href="${cssPath}"]`, document.head).extract(),
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
              setAttribute(el, 'href', cssPath);
            })
          )
          .extract()
      );
      return document.head;
    }
  )();
}
