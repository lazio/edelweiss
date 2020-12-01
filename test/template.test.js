import './crypto_for_jest';
import { html } from '../build';

describe('Test template of "edelweiss"', () => {
  test('html() must return "string"', () => {
    expect(html` <p></p> `).toMatch('<p></p>');
  });

  test('html() must insert string variable and return "string"', () => {
    const value = html` <p>${'child'}</p> `;
    expect(value).toMatch(/\s*<p>child<\/p>\s*/);
  });

  test('html() must return "string" without coerced variable if its value is undefined', () => {
    const value = html` <p>${undefined}</p> `;
    expect(value).toMatch(/\s*<p><\/p>\s*/);
  });

  test('html() must return "string" without coerced variable if its value is null', () => {
    const value = html` <p>${null}</p> `;
    expect(value).toMatch(/\s*<p><\/p>\s*/);
  });

  test('html() must return "string" with inserted "Array<string" into test', () => {
    const array = ['<p>1</p>', '<p>2</p>', html`<p>3</p>`];

    expect(html` <p>${array}</p> `).toMatch('<p><p>1</p><p>2</p><p>3</p></p>');
  });

  test('html() must return "string" with boolean attribute', () => {
    const valueFalsy = html` <button ?disabled=${false}>child</button> `;
    expect(valueFalsy).toMatch(/<button\s*>child<\/button>/);

    const valueTruthy = html` <button ?disabled=${true}>child</button> `;
    expect(valueTruthy).toMatch('<button disabled>child</button>');
  });

  test(`html() must set to an element "data-event-id-[number]" attribute 
  if event handler is passed to element`, () => {
    const button = html` <button @click=${(event) => {}}>child</button> `;
    expect(button).toMatch(
      /<button data-event-id-[\d]="?[\d]+"?>child<\/button>/
    );
  });

  test('html() must add value to other values of element attribute', () => {
    const button = html`
      <button class="some-class ${'other-class'}">child</button>
    `;
    expect(button).toMatch(
      /<button class="some-class other-class">child<\/button>/
    );
  });

  test('add updated hook to element that has value attribute', () => {
    const input = html` <input .value=${() => 'Hoooo'} /> `;

    expect(input).toMatch(/value/);
    expect(input).toMatch(/data-hook-id-updated/);
  });
});
