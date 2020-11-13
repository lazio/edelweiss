import { renderWebComponent } from '../dom/render';
import { alternation, promiseOf } from '@fluss/core';

export default abstract class WebComponent<
  T extends object = object
> extends HTMLElement {
  /**
   * Contains the rendering order. This property is similar to `renderOrder`
   * field in **render.ts** file. The property ensures that the rendering
   * will take place in the order in which the relevant functions are called.
   * But due to the fact that the Shadow DOM is updated only with changes
   * in the internal state, each instance of the custom element has its
   * own order of rendering.
   */
  #renderOrder: Promise<void> = promiseOf(undefined);
  #state: T = {} as T;

  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });

    this.#renderOrder = this.#renderOrder.then(() => renderWebComponent(this));
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
    this.#renderOrder = this.#renderOrder.then(() => renderWebComponent(this));
  }

  changeState(parts: Partial<T>): Promise<void> {
    this.#state = {
      ...this.#state,
      ...parts,
    };

    return (this.#renderOrder = this.#renderOrder.then(() =>
      renderWebComponent(this)
    ));
  }

  abstract template(): string | Promise<string>;
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
  alternation(
    () => customElements.get(tagName),
    () => {
      customElements.define(tagName, elementClass);
    }
  )();
}
