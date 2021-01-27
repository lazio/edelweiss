import './crypto_for_jest';
import { html, render } from '../build/index.js';

describe('render', () => {
  test('should append template to container', () => {
    const container = document.createElement('div');

    const template = html`<p>Child.</p>`;

    render(container, template);

    expect(container.innerHTML).toMatch('Child.');
  });
});
