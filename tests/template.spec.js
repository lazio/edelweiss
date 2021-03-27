import './crypto_for_jest';
import { html, render, bind } from '../build/index.js';

describe('html', () => {
  beforeAll(() => (document.body.innerHTML = ''));

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

  test('should invoke hook if element is mounted to DOM', () => {
    let isButtonMounted = false;

    const template = html`<button :mounted=${() => (isButtonMounted = true)}>
      Mounted
    </button>`;

    render(document.body, template);

    expect(isButtonMounted).toBe(true);
  });

  test("should invoke hook if element's regular attribute is changed", () => {
    let isElementUpdated = false;

    const [value, update] = bind('');

    const template = html`
      <button class=${value()} :updated=${() => (isElementUpdated = true)}>
        Updated
      </button>
    `;

    update('new value');

    expect(isElementUpdated).toBe(true);
  });

  test("should invoke hook if element's boolean attribute is changed", () => {
    let isElementUpdated = false;

    const [value, update] = bind(false);

    const template = html`
      <span ?disabled=${value()} :updated=${() => (isElementUpdated = true)}>
        Updated
      </span>
    `;

    update(true);

    expect(isElementUpdated).toBe(true);
  });

  test("should invoke hook if element's property is changed", () => {
    let isElementUpdated = false;

    const [value, update] = bind('');

    const template = html`
      <div .hidden="${value()}" :updated=${() => (isElementUpdated = true)}>
        Updated
      </div>
    `;

    update('secret');

    expect(isElementUpdated).toBe(true);
  });

  test('should invoke hook if element is removed from DOM', () => {
    let isElementRemoved = false;

    const [check, update] = bind(false);

    const template = html`
      <p>
        ${check((value) =>
          value
            ? html`<span></span>`
            : html`<p :will-unmount=${() => (isElementRemoved = true)}></p>`
        )}
      </p>
    `;

    update(true);

    expect(isElementRemoved).toBe(true);
  });

  test("hook's first parameter must be element", () => {
    let element;

    const [value, update] = bind(false);

    const template = html`<p
      ?h="${value()}"
      :updated=${(p) => (element = p)}
    ></p>`;

    update(true);

    expect(element).toBeInstanceOf(HTMLParagraphElement);
  });

  test('should not concat class names', () => {
    const [name, updateName] = bind('bar');

    const template = html` <p class="foo ${name()}"></p> `;

    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      /^foo bar$/
    );

    updateName('baz');

    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      /^foo baz$/
    );
  });

  test("should not add leading and trailing spaces to attribute's value", () => {
    const [type, updateType] = bind('text');

    const template = html` <input type="${type()}" /> `;

    expect(template.content.firstElementChild.getAttribute('type')).toMatch(
      /^text$/
    );

    updateType('email');

    expect(template.content.firstElementChild.getAttribute('type')).toMatch(
      /^email$/
    );
  });
});
