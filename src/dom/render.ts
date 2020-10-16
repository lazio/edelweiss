import Component from '../component/component';
import WebComponent from '../component/web_component';
import { warn } from '../utils/warn';
import { edelweissPolicy } from '../utils/trusted_types';
import { diff, diffChildren } from './diff';
import { loadCSS, unloadCSS } from '../utils/styles';
import { querySelector, cloneNode } from '@fluss/web';
import { stylePaths, stylePathsToRemove } from '../css';
import { attachEvents, detachEventListenersList } from './events';
import { normalizeHTML, normalizeHTMLForWebComponent } from './normalize_html';
import { arrayFrom, maybeOf, promiseOf, tupleOf } from '@fluss/core';
import type { State } from '../state/state';

/**
 * Contains the rendering order. The field ensures that
 * the rendering will take place in the order in which
 * the relevant functions are called.
 */
let renderOrder: Promise<void> = promiseOf(undefined);

/** Render templates on the page. */
export function render(
  to: string,
  nodes:
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>
): Promise<void> {
  return (renderOrder = renderOrder.then(() => {
    return (
      querySelector(to)
        .map((toElement) => tupleOf(toElement, cloneNode(toElement)))
        .map(([toElement, maybeClone]) => {
          return (
            normalizeHTML(nodes)
              .then((html) => {
                maybeClone.map(
                  (clone) =>
                    (clone.innerHTML = edelweissPolicy.createHTML(html))
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
              .then(() =>
                detachEventListenersList.forEach((detach) => detach())
              )
              // Delete old detach functions.
              .then(() => (detachEventListenersList.length = 0))
              .then(() =>
                arrayFrom(toElement.children).forEach((element) =>
                  attachEvents(element, true)
                )
              )
          );
        })
        .extract() ||
      warn(`Page does not contain element with selector: "${to}"!`)
    );
  }));
}

export async function renderWebComponent<T extends State>(
  element: WebComponent<T>
): Promise<void> {
  const html = await promiseOf(element.template());
  const clonedHTML = document.importNode(
    normalizeHTMLForWebComponent(html).content,
    true
  );

  /**
   * Custom element in Shadow DOM don't differs as usual DOM nodes,
   * so we don't need to detach event listeners.
   */
  arrayFrom(clonedHTML.children).forEach((child) => attachEvents(child, false));
  maybeOf(element.shadowRoot).map((shadow) => diffChildren(shadow, clonedHTML));
}
