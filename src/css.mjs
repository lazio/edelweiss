// @flow

/**
 * Holds all path of styles that was registered by [registerCss].
 * They will be added to <head> before page rendering.
 */
export const stylesPath = new Set<string>()

export function registerCss(css: string | string[]) {
  Array.isArray(css)
    ? css.forEach(stylesPath.add)
    : stylesPath.add(css)
}
