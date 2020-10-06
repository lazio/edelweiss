import { defineWebComponent, html } from '../src';

describe('Custom elements', () => {
  test('Defining default autonomous custom element', () => {
    defineWebComponent('my-def-com', (rootElement) => html`<p>Hello</p>`);

    expect(customElements.get('my-def-com')).toBeTruthy();
  });

  test('Defining autonomous custom element with object description', () => {
    defineWebComponent('my-desc-com', (rootElement) => html`<p>Hello</p>`, {
      hooks: {
        connected() {
          console.log('connected');
        },
      },
    });

    expect(customElements.get('my-desc-com')).toBeTruthy();
  });

  test('Defining customized default custom element', () => {
    defineWebComponent('my-p-com', (rootElement) => html`<p>Hello</p>`, [
      HTMLParagraphElement,
      'p',
    ]);

    expect(customElements.get('my-p-com')).toBeTruthy();
  });

  test('Defining customized custom element with object description', () => {
    defineWebComponent('my-div-com', (rootElement) => html`<p>Hello</p>`, {
      extends: {
        constructor: HTMLDivElement,
        tagName: 'div',
      },
    });

    expect(customElements.get('my-div-com')).toBeTruthy();
  });
});
