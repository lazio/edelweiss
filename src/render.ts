import Component from './component/component';
import { edelweissPolicy } from './utils/trusted_types';
import { eventListenersMap } from './template/template';
import { arrayFrom, tupleOf } from '@fluss/core';
import { loadCSS, unloadCSS } from './utils/styles';
import { querySelector, cloneNode } from '@fluss/web';
import { stylePaths, stylePathsToRemove } from './css';
import { diff, normalizeHTML, attachEvents } from './utils/dom';

/** Render templates on the page. */
export function render(
  to: string,
  nodes:
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>
): Promise<void> {
  return querySelector(to)
    .map((toElement) => {
      return tupleOf(toElement, cloneNode(toElement).extract());
    })
    .map(([toElement, clonedToElement]) => {
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
        .then((element) => diff(toElement, element));
    })
    .extract();
}
