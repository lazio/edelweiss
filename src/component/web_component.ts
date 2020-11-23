import { renderWebComponent } from '../dom/render';

export default abstract class WebComponent<
  T extends object = object
> extends HTMLElement {
  #state: T = {} as T;

  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });

    renderWebComponent(this);
  }

  get state(): T {
    return this.#state;
  }

  /**
   * If user want override this method, then at first `super.attributeChangedCallback`
   * must be called. Otherwise reactivity will be lost.
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    renderWebComponent(this);
  }

  changeState(parts: Partial<T>): void {
    this.#state = {
      ...this.#state,
      ...parts,
    };

    renderWebComponent(this);
  }

  abstract template(): string;
}

type WebComponentConstructor = {
  new (): WebComponent;
  prototype: WebComponent;
};

/** Defines custom element. */
export function defineWebComponent<E extends WebComponentConstructor>(
  tagName: string,
  elementClass: E
): void {
  customElements.get(tagName) ?? customElements.define(tagName, elementClass);
}
