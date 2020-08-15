import { isArray, forEach } from '@fluss/core';

/**
 * Holds all path of styles that was registered by [registerCss].
 * They will be added to <head> before page rendering.
 */
export const stylePaths = new Set<string>();

export function registerCss(css: string | string[]): void {
  isArray(css) ? forEach(css, stylePaths.add) : stylePaths.add(css);
}
