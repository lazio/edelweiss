// @flow

export type Styles = { [string]: number | string } | string

/**
 * Convert object of styles or string in inline CSS. It must be a valid CSS expressions (not camelCase).
 */
export function normalizeStyles(styles: Styles): string {
  const stringStyles =
    typeof styles !== 'string' ? JSON.stringify(styles) : styles
  return stringStyles.replace(/,(?![\s\d])/g, ';').replace(/[{}"']/g, '')
}

/**
 * Loads CSS file by adding <link> to <head>.
 * [name] is name of the file and extension (css).
 * Bundler must set all styles in /public/styles folder. Otherwise css files will not
 * be loaded.
 */
export function loadCSS(name: string): void {
  if (document.head) {
    const oldLinkElement = document.head.querySelector(
      `link[href="/public/styles/${name}"]` // TODO: move to config object
    )

    if (!oldLinkElement) {
      const linkElement = document.createElement('link')
      linkElement.setAttribute('rel', 'stylesheet')
      linkElement.setAttribute('href', `/public/styles/${name}`) // TODO: move to config object

      // $FlowFixMe - querySelector doesn't change the head element.
      document.head.append(linkElement)
    }
  }
}
