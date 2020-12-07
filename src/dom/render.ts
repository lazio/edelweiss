import { maybe, tuple } from '@fluss/core';
import { querySelector } from '@fluss/web';
import { edelweissPolicy } from '../utils/trusted_types';
import { diff, diffChildren } from './diff';
import { normalizeHTMLForWebComponent } from './normalize_html';
import type { WebComponent } from '../component/web_component';

/** Render templates on the page. */
export function render(to: string, nodes: string): void {
  querySelector(to)
    .map((toElement) => tuple(toElement, toElement.cloneNode(false) as Element))
    .map(([toElement, clone]) => {
      clone.innerHTML = edelweissPolicy.createHTML(nodes);
      diff(toElement, clone);
      // Need for prevent logging warning if render finished successfully.
      return true;
    })
    .extract() ??
    console.warn(`Page does not contain element with selector: "${to}"!`);
}

export function renderWebComponent<T extends object>(
  element: WebComponent<T>
): void {
  const clonedHTML = document.importNode(
    normalizeHTMLForWebComponent(element.template()).content,
    true
  );

  maybe(element.shadowRoot).map((shadow) => diffChildren(shadow, clonedHTML));
}
