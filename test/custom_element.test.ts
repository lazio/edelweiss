import { defineWebComponent, html, WebComponent } from '../src';

describe('Custom elements', () => {
  test('Defining default autonomous custom element', () => {
    defineWebComponent('my-def-com', class extends WebComponent<{}> {});

    expect(customElements.get('my-def-com')).toBeTruthy();
  });

  test('Defining autonomous custom element with custom template', () => {
    defineWebComponent(
      'my-desc-com',
      class extends WebComponent<{}> {
        template() {
          return html`<template> <p>Hello</p></template>`;
        }
      }
    );

    expect(customElements.get('my-desc-com')).toBeTruthy();
  });
});
