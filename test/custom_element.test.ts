import { html } from '../src';

describe('Test custom element creation', () => {
  test('Defining custom element', async () => {
    class MyP extends HTMLParagraphElement {}

    await html`<my-p:p=${MyP}>Hello</my-p>`;
    const myP = customElements.get('my-p');
    expect(myP).toEqual(MyP.prototype.constructor);
  });

  test('Creating custom element', async () => {
    const text = await html`<my-p>Test</my-p>`;
    expect(text).toMatch('<my-p>Test</my-p>');
  });

  test('Registering custom element do not throw an error if "extend" parameter is not defined', () => {
    expect(
      html`<u-u =${class extends HTMLElement {}}></u-u>`
    ).resolves.not.toThrow();
  });

  test('Defining custom element from template', async () => {
    class MyE extends HTMLElement {}

    const text = await html`<long-list:p=${MyE}></long-list>`;
    expect(text).toMatch('<long-list></long-list>');
  });
});
