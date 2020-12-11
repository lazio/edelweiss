import { renderWebComponent } from '../dom/render';
import type { Constructor } from '@fluss/core';

export abstract class WebComponent<
  T extends object = object
> extends HTMLElement {
  #state: T = {} as T;

  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
  }

  get state(): T {
    return this.#state;
  }

  /**
   * Users must override this method instead of
   * `connectedCallback`.
   */
  connected(): void {}

  /**
   * Users must override this method instead of
   * `disconnectedCallback`.
   */
  disconnected(): void {}

  /**
   * Users must override this method instead of
   * `adoptedCallback`.
   */
  adopted(): void {}

  /**
   * Users must override this method instead of
   * `attributeChangedCallback`.
   */
  attributeChanged(
    attributeName: string,
    oldValue: string,
    newValue: string
  ): void {}

  /** Users must not override this method! */
  connectedCallback(): void {
    // This method may be called once element is no longer connected
    // to DOM, so it must be checked.
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
    if (this.isConnected) {
      this.connected();
      renderWebComponent(this);
    }
  }

  /** Users must not override this method! */
  disconnectedCallback(): void {
    this.disconnected();
  }

  /** Users must not override this method! */
  adoptedCallback(): void {
    this.adopted();
    renderWebComponent(this);
  }

  /** Users must not override this method! */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.attributeChanged(name, oldValue, newValue);
    renderWebComponent(this);
  }

  changeState(parts: Partial<T>): void {
    // TODO: get rid of any.
    const innerState = this.#state as any;

    let isStateChanged = false;

    Object.entries(parts).forEach(([key, value]) => {
      if (!Object.is(innerState[key], value)) {
        innerState[key] = value;
        isStateChanged = true;
      }
    });

    if (isStateChanged) {
      renderWebComponent(this);
    }
  }

  abstract template(): string;
}

/** Defines custom element. */
export function defineWebComponent<E extends Constructor<WebComponent>>(
  tagName: string,
  elementClass: E
): void {
  customElements.get(tagName) ?? customElements.define(tagName, elementClass);
}
