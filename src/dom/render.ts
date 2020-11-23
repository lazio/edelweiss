import WebComponent from '../component/web_component';
import { warn } from '../utils/warn';
import { edelweissPolicy } from '../utils/trusted_types';
import { maybeOf, tupleOf } from '@fluss/core';
import { diff, diffChildren } from './diff';
import { querySelector, cloneNode } from '@fluss/web';
import { normalizeHTMLForWebComponent } from './normalize_html';

/** Render templates on the page. */
export function render(to: string, nodes: string): void {
  querySelector(to)
    .map((toElement) => tupleOf(toElement, cloneNode(toElement)))
    .chain(([toElement, maybeClone]) =>
      maybeClone
        .map((clone) => {
          clone.innerHTML = edelweissPolicy.createHTML(nodes);
          return clone;
        })
        .map((element) => {
          diff(toElement, element);
          // Need for prevent logging warning if render finished successfully.
          return true;
        })
    )
    .extract() ?? warn(`Page does not contain element with selector: "${to}"!`);
}

export function renderWebComponent<T extends object>(
  element: WebComponent<T>
): void {
  const clonedHTML = document.importNode(
    normalizeHTMLForWebComponent(element.template()).content,
    true
  );

  maybeOf(element.shadowRoot).map((shadow) => diffChildren(shadow, clonedHTML));
}
