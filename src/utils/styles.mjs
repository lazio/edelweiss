// @flow

import Maybe from './monads/maybe.mjs'
import Config from '../config.mjs'
import { tap } from './fns/fns.mjs'
import { element, createElement } from './functional.mjs'

export type Styles = { [key: string]: number | string } | string

/**
 * Convert object of styles or string in inline CSS. It must be a valid CSS expressions (not camelCase).
 */
export function normalizeStyles(styles: Styles): string {
  return (typeof styles !== 'string' ? JSON.stringify(styles) : styles)
    .replace(/,(?![\s\d])/g, ';')
    .replace(/[{}"']/g, '')
}

/**
 * Loads CSS file by adding <link> to <head>.
 * [name] is name of the file with or without extension.
 * By default bundler will set all styles in /public/styles/ folder.
 */
export function loadCSS(name: string): void {
  const cssPath = `${Config.cssRootFolder}${name}${
    /.+\.css$/.test(name) ? '' : '.css'
  }`

  Maybe.of(document.head).map((head) => {
    element(`link[href="${cssPath}"]`, head).mapNothing(() => {
      head.append(
        createElement('link')
          .map((link) =>
            tap(link, (el) => {
              el.setAttribute('rel', 'stylesheet')
            })
          )
          .map((link) =>
            tap(link, (el) => {
              el.setAttribute('href', cssPath)
            })
          )
          .extract()
      )
    })
  })
}
