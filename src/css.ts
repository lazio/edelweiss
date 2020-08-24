import { unloadCSS } from './utils/styles';
import { isArray, forEach } from '@fluss/core';

/**
 * Holds all path of styles that was registered by [registerCss].
 * They will be added to <head> before page rendering.
 */
export const stylePaths = new Set<string>();
/**
 * Holds all path of style that need to be unregistered.
 * They will be deleted from <head> on next rendering cycle.
 */
export const stylePathsToRemove = new Set<string>();

/**
 * Lazingly load CSS to page.
 * @param {string | Array<string>} css - name of css files that need to be
 * lazy loaded.
 * @returns {(immediately?: boolean) => void} function that unload registered css
 * (removes from the page). If [immediately] is `true`, then css will be removed
 * in time of function's invoking, otherwise css will be removed on next
 * rendering step (`Router.to`, `Router.reload` etc).
 */
export function registerCss(
  css: string | Array<string>
): (immediately?: boolean) => void {
  isArray(css) ? forEach(css, stylePaths.add) : stylePaths.add(css);
  return (immediately: boolean = false) => {
    isArray(css)
      ? forEach(css, immediately ? unloadCSS : stylePathsToRemove.add)
      : immediately
      ? unloadCSS(css)
      : stylePathsToRemove.add(css);
  };
}
