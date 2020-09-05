import Component from './component/component';
import { arrayFrom } from '@fluss/core';
import { edelweissPolicy } from './utils/trusted_types';
import { eventListenersMap } from './template/template';
import { loadCSS, unloadCSS } from './utils/styles';
import { stylePaths, stylePathsToRemove } from './css';
import { diff, normalizeHTML, attachEvents } from './utils/dom';
import { querySelector, replaceNode, cloneNode } from '@fluss/web';

/**
 * Render templates on the page.
 */
export function render(
  to: string,
  nodes:
    | string
    | Component
    | Promise<string>
    | (string | Component | Promise<string>)[]
): Promise<void> {
  return querySelector(to)
    .map((toElement) => {
      return {
        toElement,
        clonedToElement: cloneNode(toElement).extract(),
      };
    })
    .map(({ toElement, clonedToElement }) => {
      return normalizeHTML(nodes)
        .then((html) => {
          clonedToElement.innerHTML = edelweissPolicy.createHTML(html);
          return clonedToElement;
        })
        .then((element) => {
          arrayFrom(element.children).forEach(attachEvents);
          return element;
        })
        .then((element) => {
          stylePaths.forEach(loadCSS);
          stylePathsToRemove.forEach(unloadCSS);
          // Clear events cash
          eventListenersMap.clear();
          // Clear paths of styles
          stylePaths.clear();
          stylePathsToRemove.clear();
          return element;
        })
        .then((element) => {
          toElement.hasChildNodes()
            ? diff(toElement, element)
            : replaceNode(toElement, element);
        });
    })
    .extract();
}
