import { isNothing, promiseOf, alternation } from '@fluss/core';
import { appendNodes, querySelector, createElement } from '@fluss/web';

type HTMLElementDescriptionObject = {
  observedAttributes?: Array<string>;
  hooks?: {
    connected?: (rootElement: HTMLElement) => void;
    disconnected?: (rootElement: HTMLElement) => void;
    adopted?: (rootElement: HTMLElement) => void;
    attributeChanged?: (
      rootElement: HTMLElement,
      name: string,
      oldValue: string,
      newValue: string
    ) => void;
  };
  extends?: {
    constructor: CustomElementConstructor;
    tagName?: string;
  };
};

type TemplateFunction = (
  rootElement: HTMLElement
) => string | Promise<string> | HTMLTemplateElement;

/** Defines custom element. */
export function defineWebComponent(
  tagName: string,
  templateOrClass:
    | [constructor: CustomElementConstructor, tagName?: string]
    | TemplateFunction,
  componentOptions: HTMLElementDescriptionObject = {}
): void {
  let componentClass: CustomElementConstructor;
  let extendsElementOptions: {
    constructor: CustomElementConstructor;
    tagName?: string;
  } = { constructor: HTMLElement, tagName: undefined };

  if (Array.isArray(templateOrClass)) {
    componentClass = class extends templateOrClass[0] {};
    extendsElementOptions.tagName = templateOrClass[1];
  } else {
    const {
      observedAttributes = [],
      hooks = {},
      extends: extendsClause,
    } = componentOptions;

    if (!isNothing(extendsClause)) {
      extendsElementOptions = extendsClause;
    }

    componentClass = class extends extendsElementOptions.constructor {
      static get observedAttributes(): Array<string> {
        return observedAttributes;
      }

      constructor() {
        super();

        promiseOf((templateOrClass as TemplateFunction)(this)).then((html) => {
          const shadow = this.attachShadow({
            mode: 'open',
          });

          const clonedHTML = document.importNode(
            prepareHTML(html).content,
            true
          );

          appendNodes(shadow, clonedHTML);
        });
      }

      connectedCallback() {
        if (!isNothing(hooks.connected)) {
          hooks.connected(this);
        }
      }

      disconnectedCallback() {
        if (!isNothing(hooks.disconnected)) {
          hooks.disconnected(this);
        }
      }

      adoptedCallback() {
        if (!isNothing(hooks.adopted)) {
          hooks.adopted(this);
        }
      }

      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        if (!isNothing(hooks.attributeChanged)) {
          hooks.attributeChanged(this, name, oldValue, newValue);
        }
      }
    };
  }

  alternation(
    () => customElements.get(tagName),
    () => {
      customElements.define(tagName, componentClass, {
        extends: extendsElementOptions.tagName,
      });
    }
  )();
}

function prepareHTML(html: string | HTMLElement): HTMLTemplateElement {
  const wrapperElement = createElement('div')
    .map((div) => {
      typeof html === 'string'
        ? (div.innerHTML = html)
        : appendNodes(div, html);
      return div;
    })
    .extract();

  return (
    querySelector<HTMLTemplateElement>('template', wrapperElement).extract() ||
    /**
     * Template element must be directly defined in HTML.
     * Content can't be added to it in JS.
     * So function returns empty element as fallback.
     */
    createElement('template').extract()
  );
}
