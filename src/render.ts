import Component from './component/component';
import { loadCSS } from './utils/styles';
import { arrayFrom } from '@fluss/core';
import { stylePaths } from './css';
import { edelweissPolicy } from './utils/trusted_types';
import { eventListenersMap } from './template/template';
import { querySelector, replace } from '@fluss/web';
import { diff, normalizeHTML, attachEvents } from './utils/dom';

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
      const element = toElement.cloneNode(false) as Element;

      return normalizeHTML(nodes)
        .then((html) => {
          element.innerHTML = edelweissPolicy.createHTML(html);
          return element;
        })
        .then((element) => {
          arrayFrom(element.children).forEach(attachEvents);
          return element;
        })
        .then((element) => {
          stylePaths.forEach(loadCSS);
          // Clear events cash
          eventListenersMap.clear();
          // Clear paths of styles
          stylePaths.clear();
          return element;
        })
        .then((element) => {
          toElement.hasChildNodes()
            ? diff(toElement, element)
            : replace(toElement, element);
        });
    })
    .extract();
}
