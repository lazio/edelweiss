import './crypto_for_jest';
import { html } from '../src';

describe('Test template of "edelweiss"', () => {
  test('html() must return Promise<string>', () => {
    expect(html` <p></p> `).resolves.toMatch('<p></p>');
  });

  test('html() must insert string variable and return Promise<string>', async () => {
    const value = await html` <p>${'child'}</p> `;
    expect(value).toMatch(/\s*<p>child<\/p>\s*/);
  });

  test('html() must return Promise<string> without coerced variable if its value is undefined', async () => {
    const value = await html` <p>${undefined}</p> `;
    expect(value).toMatch(/\s*<p><\/p>\s*/);
  });

  test('html() must return Promise<string> without coerced variable if its value is null', async () => {
    const value = await html` <p>${null}</p> `;
    expect(value).toMatch(/\s*<p><\/p>\s*/);
  });

  test('html() must return Promise<string> with inserted "Array<string | Promise<string>>" into test', () => {
    const array = ['<p>1</p>', '<p>2</p>', html`<p>3</p>`];

    expect(html` <p>${array}</p> `).resolves.toMatch(
      '<p><p>1</p><p>2</p><p>3</p></p>'
    );
  });

  test('html() must return Promise<string> with inserted "Promise<string>" into test', () => {
    const child = html` <span>Child</span> `;
    expect(html` <p>${child}</p> `).resolves.toMatch(
      /<p>\s*<span>Child<\/span>\s*<\/p>/
    );
  });

  test('html() must return Promise<string> with boolean attribute', async () => {
    const valueFalsy = await html` <button ?disable=${false}>child</button> `;
    expect(valueFalsy).toMatch(/<button\s*>child<\/button>/);

    const valueTruthy = await html` <button ?disable=${true}>child</button> `;
    expect(valueTruthy).toMatch('<button disable>child</button>');
  });

  test(`html() must set to an element "data-event-id-[number]" attribute 
  if event handler is passed to element`, async () => {
    const button = await html`
      <button @click=${(event: MouseEvent) => {}}>child</button>
    `;
    expect(button).toMatch(
      /<button data-event-id-[\d]="?[\d]+"?>child<\/button>/
    );
  });

  test('html() must add value to other values of element attribute', async () => {
    const button = await html`
      <button class="some-class ${'other-class'}">child</button>
    `;
    expect(button).toMatch(
      /<button class="some-class other-class">child<\/button>/
    );
  });
});
