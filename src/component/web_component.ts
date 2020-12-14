import { renderWebComponent } from '../dom/render';
import type { Constructor } from '@fluss/core';

/** Parent class for custom elements. */
export abstract class WebComponent<
  T extends object = object
> extends HTMLElement {
  private readonly _state: T = {} as T;

  /**
   * When overriding constructor always call **super()** at start,
   * so that the correct prototype chain will be established.
   */
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
  }

  /* Returns array of attribute names to monitor for changes. */
  static get observedAttributes(): ReadonlyArray<string> {
    return [];
  }

  /**
   * Returns state of custom element.
   * For changing state use `changeState` method.
   */
  get state(): T {
    return this._state;
  }

  /**
   * Called this method when the element is added to the document
   * (can be called many times if an element is repeatedly added/removed).
   *
   * Alias to `connectedCallback`.
   */
  connected(): void {}

  /**
   * Called this method when the element is removed from the document
   * (can be called many times if an element is repeatedly added/removed).
   *
   * Alias to `disconnectedCallback`.
   */
  disconnected(): void {}

  /**
   * Called when the element is moved to a new document
   * (happens in `document.adoptNode`).
   *
   * Alias to `adoptedCallback`.
   */
  adopted(): void {}

  /**
   * Called when one of attributes returned by `observedAttributes`
   * is modified.
   *
   * Alias to `attributeChangedCallback`.
   */
  attributeChanged(
    attributeName: string,
    oldValue: string,
    newValue: string
  ): void {}

  /** Users must not override this method! */
  private connectedCallback(): void {
    // This method may be called once element is no longer connected
    // to DOM, so it must be checked.
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
    if (this.isConnected) {
      this.connected();
      renderWebComponent(this);
    }
  }

  /** Users must not override this method! */
  private disconnectedCallback(): void {
    this.disconnected();
  }

  /** Users must not override this method! */
  private adoptedCallback(): void {
    this.adopted();
    renderWebComponent(this);
  }

  /** Users must not override this method! */
  private attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.attributeChanged(name, oldValue, newValue);
    renderWebComponent(this);
  }

  /**
   * Change part of state of custom element.
   * Every change is reactive.
   */
  changeState(parts: Partial<T>): void {
    // TODO: get rid of any.
    const innerState = this._state as any;

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

  /**
   * Defines inner DOM of custom element as Shadow DOM.
   *
   * Returned HTML will be wrapped with `HTMLTemplateElement`,
   * if method returns HTML that are not wrapped with top-level `<template>`.
   */
  abstract template(): string;
}

/**
 * Defines autonomous custom elements. Can be safely called many times.
 *
 * More info about custom elements and their lifecycles
 * [at MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
 */
export function defineWebComponent<E extends Constructor<WebComponent>>(
  /** Name of the custom tag. Must contain dash symbol. */
  tagName: string,
  /** Class that describe custom element. `template` method must be overridden. */
  elementClass: E
): void {
  customElements.get(tagName) ?? customElements.define(tagName, elementClass);
}
