import Component from './component/component';
import { edelweissPolicy } from './utils/trusted_types';
import { loadCSS, unloadCSS } from './utils/styles';
import { querySelector, cloneNode } from '@fluss/web';
import { stylePaths, stylePathsToRemove } from './css';
import { arrayFrom, promiseOf, tupleOf } from '@fluss/core';
import {
  diff,
  attachEvents,
  normalizeHTML,
  detachEventListenersList,
} from './utils/dom';

/** Render templates on the page. */
export function render(
  to: string,
  nodes:
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>
): Promise<void> {
  return (
    querySelector(to)
      .map((toElement) => tupleOf(toElement, cloneNode(toElement)))
      .map(([toElement, maybeClone]) => {
        return (
          normalizeHTML(nodes)
            .then((html) => {
              maybeClone.map(
                (clone) => (clone.innerHTML = edelweissPolicy.createHTML(html))
              );
            })
            .then(() => {
              stylePaths.forEach(loadCSS);
              stylePathsToRemove.forEach(unloadCSS);

              // Clear paths of styles
              stylePaths.clear();
              stylePathsToRemove.clear();
            })
            .then(() => maybeClone.map((clone) => diff(toElement, clone)))
            .then(() => detachEventListenersList.forEach((detach) => detach()))
            // Delete old detach functions.
            .then(() => (detachEventListenersList.length = 0))
            .then(() =>
              arrayFrom(toElement.children).forEach((element) =>
                attachEvents(element, true)
              )
            )
        );
      })
      .extract() || promiseOf(undefined)
  );
}
