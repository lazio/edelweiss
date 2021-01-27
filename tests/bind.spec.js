import './crypto_for_jest';
import { html, bind } from '../build/index.js';

describe('bind', () => {
  test('should change value of attribute', () => {
    const [getter, update] = bind(false);

    const template = html`<p
      class="useful ${getter((value) => (value ? 'a' : 'b'))}"
    ></p>`;

    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      'b'
    );
    update(true);
    expect(template.content.firstElementChild.getAttribute('class')).toMatch(
      'a'
    );
  });

  test('should dynamically inserts nodes into html', () => {
    const [getter, update] = bind(true);

    const template = html`<p>
      ${getter((value) => {
        return value ? html`<a></a>` : ['bar', html`<div></div>`];
      })}
    </p>`;

    expect(
      template.content.firstElementChild.firstElementChild.tagName.toLowerCase()
    ).toMatch('a');
    update(false);
    expect(template.content.firstElementChild.innerHTML).toMatch('bar');
    expect(
      template.content.firstElementChild.firstElementChild.tagName.toLowerCase()
    ).toMatch('div');
  });

  test('should toggle attribute', () => {
    const [isReadonly, update] = bind(false);

    const template = html`<p ?readonly=${isReadonly()}></p>`;

    expect(template.content.firstElementChild.hasAttribute('readonly')).toBe(
      false
    );
    update(true);
    expect(template.content.firstElementChild.hasAttribute('readonly')).toBe(
      true
    );
  });

  test('should change value of node property', () => {
    const [isReadonly, update] = bind(false);

    const template = html`<p .readonly=${isReadonly()}></p>`;

    expect(template.content.firstElementChild.readonly).toBe(false);
    update(true);
    expect(template.content.firstElementChild.readonly).toBe(true);
  });

  test('should change value of dependency not bounded to DOM', () => {
    const [isReadonly, update] = bind(false);

    expect(isReadonly().value).toBe(false);
    update(true);
    expect(isReadonly().value).toBe(true);
  });

  test(
    'should change value of dependency not bounded to DOM with mapper function' +
      'based on old value',
    () => {
      const [isReadonly, update] = bind(false);

      expect(isReadonly().value).toBe(false);
      update((old) => !old);
      expect(isReadonly().value).toBe(true);
    }
  );
});
