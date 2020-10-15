import { alternation } from '@fluss/core';
import { renderWebComponent } from '../dom/render';
import type { State } from '../state/state';

export default class WebComponent<T extends State = {}> extends HTMLElement {
  state: T = {} as T;

  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });

    renderWebComponent(this);
  }

  changeState(parts: Partial<T>): Promise<void> {
    this.state = {
      ...this.state,
      ...parts,
    };
    return renderWebComponent(this);
  }

  template(): string | Promise<string> {
    return '';
  }
}

/** Defines custom element. */
export function defineWebComponent<T extends State>(
  tagName: string,
  elementClass: { new (): WebComponent<T>; prototype: WebComponent<T> }
): void {
  alternation(
    () => customElements.get(tagName),
    () => {
      customElements.define(tagName, elementClass);
    }
  )();
}
