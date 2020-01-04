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

export function loadCSS(path: string): void {
  if (document.head) {
    const oldLinkElement = document.head.querySelector(`link[href="${path}"]`)

    if (!oldLinkElement) {
      const linkElement = document.createElement('link')
      linkElement.setAttribute('rel', 'stylesheet')
      linkElement.setAttribute('href', path)

      // $FlowFixMe - querySelector doesn't change the head element.
      document.head.append(linkElement)
    }
  }
}
