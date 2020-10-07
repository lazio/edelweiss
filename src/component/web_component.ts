import { edelweissPolicy } from '../utils/trusted_types';
import { appendNodes, cloneNode } from '@fluss/web';
import { alternation, isNothing, promiseOf } from '@fluss/core';

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

/**
 * Defines custom element.
 * @param tagName name of the custom tag. Must contain dash symbol.
 * @param template creates inner HTML of custom element.
 * Accept created custom element as parameter.
 * @param componentOptionsOrClass is either tuple of custom element class
 * or object that describes behavior of custom element.
 */
export function defineWebComponent(
  tagName: string,
  template: (
    rootElement: HTMLElement
  ) => string | Promise<string> | HTMLElement,
  componentOptionsOrClass:
    | HTMLElementDescriptionObject
    | [constructor: CustomElementConstructor, tagName?: string] = [HTMLElement]
): void {
  let componentClass: CustomElementConstructor;
  let extendsElementOptions: {
    constructor: CustomElementConstructor;
    tagName?: string;
  } = { constructor: HTMLElement, tagName: undefined };

  if (Array.isArray(componentOptionsOrClass)) {
    componentClass = class extends componentOptionsOrClass[0] {};
    extendsElementOptions.tagName = componentOptionsOrClass[1];
  } else {
    const {
      observedAttributes = [],
      hooks = {},
      extends: extendsClause,
    } = componentOptionsOrClass;

    if (!isNothing(extendsClause)) {
      extendsElementOptions = extendsClause;
    }

    componentClass = class extends extendsElementOptions.constructor {
      static get observedAttributes(): Array<string> {
        return observedAttributes;
      }

      constructor() {
        super();

        promiseOf(template(this)).then((html) => {
          const shadow = this.attachShadow({
            mode: 'open',
          });

          html instanceof HTMLElement
            ? appendNodes(shadow, cloneNode(html, true))
            : (shadow.innerHTML = edelweissPolicy.createHTML(html));
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
