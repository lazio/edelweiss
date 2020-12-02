import './crypto_for_jest';
import { html, router, WebComponent, defineWebComponent } from '../build';

describe('Custom elements', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>';

    router.configure({
      container: '#app',
    });
  });

  test('Defining default autonomous custom element', () => {
    defineWebComponent(
      'my-defcom',
      class extends WebComponent {
        template() {
          return '';
        }
      }
    );

    expect(customElements.get('my-defcom')).toBeTruthy();
  });

  test('Multiple defining of custom element will not cause an error', () => {
    expect(() =>
      defineWebComponent(
        'my-defcom',
        class extends WebComponent {
          template() {
            return '';
          }
        }
      )
    ).not.toThrow();
    expect(() =>
      defineWebComponent(
        'my-defcom',
        class extends WebComponent {
          template() {
            return '';
          }
        }
      )
    ).not.toThrow();
  });

  test('Defining autonomous custom element with custom template', () => {
    defineWebComponent(
      'my-desccom',
      class extends WebComponent {
        template() {
          return html`<template><p>Hello</p></template>`;
        }
      }
    );

    expect(customElements.get('my-desccom')).toBeTruthy();
  });

  test('Defining state in custom element', async () => {
    router.add({
      path: '/def-state',
      view() {
        return html` <my-a></my-a> `;
      },
    });

    class MyA extends WebComponent {
      constructor() {
        super();

        this.changeState({
          isDefined: true,
        });
      }

      template() {
        return html`<template> <button></button></template>`;
      }
    }

    defineWebComponent('my-a', MyA);

    await router.to('/def-state');

    const myA = document.querySelector('my-a');
    if (myA) {
      expect(myA.state.isDefined).toBe(true);
    }
  });

  test('Rerender on change state', async () => {
    router.add({
      path: '/state',
      view() {
        return html` <my-desc></my-desc> `;
      },
    });

    class MyDescCom extends WebComponent {
      constructor() {
        super();

        this.changeState({
          isChanged: false,
        });
      }

      template() {
        return html`<template>
          <button
            @click=${() => {
              this.changeState({
                isChanged: !this.state.isChanged,
              });
            }}
          >
            ${this.state.isChanged + ''}
          </button>
        </template>`;
      }
    }

    defineWebComponent('my-desc', MyDescCom);

    await router.to('/state');

    const customElement = document.querySelector('my-desc');

    if (customElement) {
      customElement.shadowRoot?.querySelector('button')?.click();

      expect(customElement.state.isChanged).toBe(true);
      expect(
        customElement.shadowRoot?.querySelector('button')?.innerHTML
      ).toMatch('true');
    }
  });

  test('Diffing similar elements with different event listeners', async () => {
    router.add({
      path: '/listeners(\\d+)?',
      view() {
        return html` <my-listener></my-listener> `;
      },
    });

    class MyListener extends WebComponent {
      constructor() {
        super();

        this.changeState({
          word: '',
        });
      }

      template() {
        return html`<template>
          ${router.current.parameters[1] === undefined
            ? html`<button
                @click=${() => {
                  this.changeState({
                    word: 'first',
                  });
                }}
              ></button>`
            : html`<button
                @click=${() => {
                  this.changeState({
                    word: 'second',
                  });
                }}
              ></button>`}
        </template>`;
      }
    }

    defineWebComponent('my-listener', MyListener);

    await router.to('/listeners');

    const customElement = document.querySelector('my-listener');

    if (customElement) {
      customElement.shadowRoot?.querySelector('button')?.click();
      expect(customElement.state.word).toMatch('first');

      await router.to('/listeners1');

      customElement.shadowRoot?.querySelector('button')?.click();
      setTimeout(() => expect(customElement.state.word).toMatch('second'), 0);
    }
  });

  test('Diffing element with text node', async () => {
    router.add({
      path: '/diff-element-text-node(\\d+)?',
      view() {
        return html` <my-diff></my-diff> `;
      },
    });

    class MyDiff extends WebComponent {
      constructor() {
        super();

        this.changeState({
          word: '',
        });
      }

      template() {
        return html`<template>
          ${router.current.parameters[1] !== undefined
            ? html`<button
                @click=${() => {
                  this.changeState({
                    word: 'set',
                  });
                }}
              ></button>`
            : ''}
        </template>`;
      }
    }

    defineWebComponent('my-diff', MyDiff);

    await router.to('/diff-element-text-node');

    const customElement = document.querySelector('my-diff');

    if (customElement) {
      expect(customElement.shadowRoot?.querySelector('button')).toBeFalsy();

      await router.to('/diff-element-text-node1');

      customElement.shadowRoot?.querySelector('button')?.click();

      setTimeout(() => expect(customElement.state.word).toMatch('set'), 0);
    }
  });

  test('Testing reactivity on attribute changes', async () => {
    router.add({
      path: '/reactive-attributes',
      view() {
        return html` <reactive-attributes></reactive-attributes> `;
      },
    });

    class ReactiveAttributesElement extends WebComponent {
      renderCount = 0;

      static get observedAttributes() {
        return ['disabled'];
      }

      get disabled() {
        return this.hasAttribute('disabled');
      }

      template() {
        this.renderCount++;
        return html` ${this.disabled} `;
      }
    }

    defineWebComponent('reactive-attributes', ReactiveAttributesElement);

    await router.to('/reactive-attributes');

    const customElement = document.querySelector('reactive-attributes');

    if (customElement) {
      setTimeout(() => expect(customElement.renderCount).toBe(1), 0);

      customElement.setAttribute('disabled', 'true');

      setTimeout(() => expect(customElement.renderCount).toBe(2), 0);
    }
  });

  test("Shadow DOM of custom element must not be rebuilded if state's value did not change.", async () => {
    router.add({
      path: '/not-reactive-values',
      view() {
        return html` <nonreactive-values></nonreactive-values> `;
      },
    });

    class NonReactiveValuesElement extends WebComponent {
      renderCount = 0;

      constructor() {
        super();

        this.changeState({
          h: 0,
        });
      }

      template() {
        this.renderCount++;
        return html`
          <button
            @click=${() =>
              this.changeState({
                h: 0,
              })}
          ></button>
        `;
      }
    }

    defineWebComponent('nonreactive-values', NonReactiveValuesElement);

    await router.to('/not-reactive-values');

    const customElement = document.querySelector('nonreactive-values');

    if (customElement) {
      setTimeout(() => expect(customElement.renderCount).toBe(1), 0);

      const button = customElement.shadowRoot.querySelector('button');

      if (button) {
        button.click();
        button.click();
        button.click();
        button.click();

        setTimeout(() => expect(customElement.renderCount).toBe(1), 0);
      }
    }
  });
});
