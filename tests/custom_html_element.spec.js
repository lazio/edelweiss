import { html, CustomHTMLElement } from '../build/index.js';

describe('CustomHTMLElement', () => {
  test('should define custom web element', () => {
    class MyElement extends CustomHTMLElement {
      template() {
        return html`<button></button>`;
      }
    }

    customElements.define('my-component', MyElement);

    expect(customElements.get('my-component')).toBe(MyElement);
  });
});
