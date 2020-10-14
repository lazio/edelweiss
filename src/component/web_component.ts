import { edelweissPolicy } from '../utils/trusted_types';
import { attachEvents, diffChildren } from '../utils/dom';
import { querySelector, createElement } from '@fluss/web';
import { maybeOf, arrayFrom, promiseOf, alternation } from '@fluss/core';
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

  changeState(parts: Partial<T>): void {
    this.state = {
      ...this.state,
      ...parts,
    };
    renderWebComponent(this);
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

function prepareHTML(html: string): HTMLTemplateElement {
  const wrapperElement = createElement('div')
    .map((div) => {
      div.innerHTML = edelweissPolicy.createHTML(
        html.trim().startsWith('<template')
          ? html
          : `<template>${html}</template>`
      );
      return div;
    })
    .extract();

  return (
    querySelector('template', wrapperElement).extract() ||
    /**
     * Template element must be directly defined in HTML.
     * Content can't be added to it in JS.
     * So function returns empty element as fallback.
     */
    createElement('template').extract()
  );
}

function renderWebComponent<T extends State>(element: WebComponent<T>): void {
  promiseOf(element.template()).then((html) => {
    const clonedHTML = document.importNode(prepareHTML(html).content, true);

    /**
     * Custom element in Shadow DOM don't differs as usual DOM nodes,
     * so we don't need to detach event listeners.
     */
    arrayFrom(clonedHTML.children).forEach((element) =>
      attachEvents(element, false)
    );

    maybeOf(element.shadowRoot).map((shadow) =>
      diffChildren(shadow, clonedHTML)
    );
  });
}
