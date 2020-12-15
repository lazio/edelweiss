import { edelweissPolicy } from '../utils/trusted_types';
import { diff, diffChildren } from './diff';
import { normalizeHTMLForWebComponent } from './normalize_html';
import type { WebComponent } from '../component/web_component';

/** Render templates on the page. */
export function render(to: string, nodes: string): void {
  const toElement = document.querySelector(to);

  if (toElement === null) {
    console.warn(`Page does not contain element with selector: "${to}"!`);
  } else {
    const clonedToElement = toElement.cloneNode(false) as Element;
    clonedToElement.innerHTML = edelweissPolicy.createHTML(nodes);

    diff(toElement, clonedToElement);
  }
}

export function renderWebComponent<T extends object>(
  element: WebComponent<T>
): void {
  const clonedHTML = document.importNode(
    normalizeHTMLForWebComponent(element.template()).content,
    true
  );

  if (element.shadowRoot !== null) {
    diffChildren(element.shadowRoot, clonedHTML);
  }
}
