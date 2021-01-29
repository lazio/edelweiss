import './crypto_for_jest';
import { html } from '../build/index.js';

describe('html', () => {
  test('html creates DOM nodes', () => {
    const template = html`<p></p>`;

    expect(template).toBeInstanceOf(HTMLTemplateElement);
    expect(template.content.childElementCount).toBe(1);
    expect(
      template.content.firstElementChild.isEqualNode(
        document.createElement('p')
      )
    ).toBe(true);
  });

  test('html inserts value as node into HTML', () => {
    const template = html`<p>${html`yo`}</p>`;

    expect(template.content.firstElementChild.innerHTML).toMatch('yo');
    expect(template.content.firstElementChild.childNodes.item(0).nodeType).toBe(
      Node.COMMENT_NODE
    );
    expect(template.content.firstElementChild.childNodes.item(1).nodeType).toBe(
      Node.TEXT_NODE
    );
  });

  test('html inserts array of nodes into HTML', () => {
    const template = html`<p>${[html`foo`, 'bar', html`baz`]}</p>`;

    expect(template.content.firstElementChild.childNodes.length).toBe(
      4 /* 3 Texts + 1 Comment */
    );
    expect(template.content.firstElementChild.innerHTML).toMatch('foo');
    expect(template.content.firstElementChild.innerHTML).toMatch('bar');
    expect(template.content.firstElementChild.innerHTML).toMatch('baz');
  });

  test('html must insert single attribute value', () => {
    const template = html`<p class="${'header'}"></p>`;

    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      'header'
    );
  });

  test('html must insert attribute value with static parts', () => {
    const template = html`<p class="useful ${'value'}"></p>`;

    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      'useful value'
    );
  });

  test('html must set toggle attribute if value is truthy', () => {
    const template = html`<p ?readonly="${true}"></p>`;

    expect(template.content.firstElementChild.hasAttribute('readonly')).toBe(
      true
    );
  });

  test('html must remove toggle attribute if value is falsy', () => {
    const template = html`<p ?readonly="${false}"></p>`;

    expect(template.content.firstElementChild.hasAttribute('readonly')).toBe(
      false
    );
  });

  test('html must attach event listener to node', () => {
    let clicked = false;

    const template = html`<button @click="${() => (clicked = true)}"></button>`;

    expect(clicked).toBe(false);

    template.content.firstElementChild.click();

    expect(clicked).toBe(true);
  });

  test('html must set property to node', () => {
    const template = html`<span .title="${'foo'}"></span>`;

    expect(template.content.firstElementChild.title).toBe('foo');
  });

  test('should insert null and other values except HTMLTemplateElement as text node', () => {
    const template = html` <span>${null}${undefined}${12345}${true}</span> `;

    expect(template.content.firstElementChild.innerHTML).toMatch('null');
    expect(template.content.firstElementChild.innerHTML).toMatch('undefined');
    expect(template.content.firstElementChild.innerHTML).toMatch('12345');
    expect(template.content.firstElementChild.innerHTML).toMatch('true');
  });
});
