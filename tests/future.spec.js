import './crypto_for_jest';
import { html, future } from '../build/index.js';

describe('future', () => {
  test('should insert asynchronous nodes into DOM with no fallback', () => {
    function asyncChild() {
      return new Promise((resolve) =>
        setTimeout(() => resolve(html`<p></p>`), 1000)
      );
    }

    const [nodes, update] = future();
    const template = html`<div>${nodes}</div>`;

    expect(template.content.firstElementChild.childNodes.length).toBe(
      3 /* text and 2 comments */
    );

    update(asyncChild());

    setTimeout(
      () =>
        expect(template.content.firstElementChild.childNodes.length).toBe(3),
      0
    );
  });

  test('should insert asynchronous nodes into DOM with fallback', () => {
    function asyncChild() {
      return new Promise((resolve) =>
        setTimeout(() => resolve(html`<p></p>`), 1000)
      );
    }

    const [nodes, update] = future(html`Fallback`);
    const template = html`<div>${nodes}</div>`;

    expect(template.content.firstElementChild.childNodes.item(1).nodeType).toBe(
      Node.TEXT_NODE
    );

    update(asyncChild());

    setTimeout(() => {
      expect(template.content.firstElementChild.childNodes.length).toBe(3);
      expect(
        template.content.firstElementChild.firstElementChild.tagName.toLowerCase()
      ).toBe('p');
    }, 0);
  });
});
