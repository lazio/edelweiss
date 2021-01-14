import { edelweissPolicy } from '../utils/trusted_types';
import { diff, diffChildren } from './diff';
import { normalizeHTMLForWebComponent } from './normalize_html';
import { asyncHTMLMap, getStubElement } from './async_html';
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
    renderLazyTemplates(toElement);
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
    renderLazyTemplates(element.shadowRoot);
  }
}

function renderLazyTemplates(root: Element | ShadowRoot): void {
  asyncHTMLMap.forEach((lazyTemplate, stubId) => {
    const stubElement = getStubElement(root, stubId);

    if (stubElement !== null) {
      lazyTemplate
        .then(
          (html) => {
            const stubParentElement = stubElement.parentElement;

            const cloneElement = stubElement.cloneNode(false) as Element;
            cloneElement.innerHTML = edelweissPolicy.createHTML(html);
            diff(stubElement, cloneElement);
            stubElement.replaceWith(...stubElement.childNodes);

            if (
              stubParentElement !== null &&
              getStubElement(stubParentElement) !== null
            ) {
              renderLazyTemplates(stubParentElement);
            }
          },
          () => {
            console.error(
              'An error is occured while loading lazy template with stub "' +
                stubId +
                '".'
            );
          }
        )
        .then(() => asyncHTMLMap.delete(stubId));
    }
  });
}
