import './crypto_for_jest';
import { defineWebComponent, html, Router, WebComponent } from '../src';

describe('Custom elements', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>';

    Router.configure({
      baseContainer: '#app',
    });
  });

  test('Defining default autonomous custom element', () => {
    defineWebComponent('my-defcom', class extends WebComponent {});

    expect(customElements.get('my-defcom')).toBeTruthy();
  });

  test('Multiple defining of custom element will not cause an error', () => {
    expect(() =>
      defineWebComponent('my-defcom', class extends WebComponent {})
    ).not.toThrow();
    expect(() =>
      defineWebComponent('my-defcom', class extends WebComponent {})
    ).not.toThrow();
  });

  test('Defining autonomous custom element with custom template', () => {
    defineWebComponent(
      'my-desccom',
      class extends WebComponent {
        template() {
          return html`<template> <p>Hello</p></template>`;
        }
      }
    );

    expect(customElements.get('my-desccom')).toBeTruthy();
  });

  test('Defining state in custom element', async () => {
    Router.add({
      path: '/def-state',
      view() {
        return html` <my-a></my-a> `;
      },
    });

    class MyA extends WebComponent<{ isDefined: boolean }> {
      constructor() {
        super();

        this.state = {
          isDefined: true,
        };
      }

      template() {
        return html`<template> <button></button></template>`;
      }
    }

    defineWebComponent('my-a', MyA);

    await Router.to('/def-state');

    const myA = document.querySelector<MyA>('my-a');
    if (myA) {
      expect(myA.state.isDefined).toBe(true);
    }
  });

  test('Rerender on change state', async () => {
    Router.add({
      path: '/state',
      view() {
        return html` <my-desc></my-desc> `;
      },
    });

    class MyDescCom extends WebComponent<{ isChanged: boolean }> {
      constructor() {
        super();

        this.state = {
          isChanged: false,
        };
      }

      template() {
        return html`<template>
          <button
            @click=${() => {
              this.changeState({
                isChanged: !this.state.isChanged,
              });
            }}
          ></button>
        </template>`;
      }
    }

    defineWebComponent('my-desc', MyDescCom);

    await Router.to('/state');

    const customElement = document.querySelector<MyDescCom>('my-desc');

    if (customElement) {
      customElement.shadowRoot?.querySelector('button')?.click();

      setTimeout(() => expect(customElement.state.isChanged).toBe(true), 0);
    }
  });

  test('Diffing similar elements with different event listeners', async () => {
    Router.add({
      path: '/listeners:digit:?',
      view() {
        return html` <my-listener></my-listener> `;
      },
    });

    class MyListener extends WebComponent<{ word: string }> {
      constructor() {
        super();

        this.state = {
          word: '',
        };
      }

      template() {
        return html`<template>
          ${Router.current.parameters &&
          Router.current.parameters[1] === undefined
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

    await Router.to('/listeners');

    const customElement = document.querySelector<MyListener>('my-listener');

    if (customElement) {
      customElement.shadowRoot?.querySelector('button')?.click();

      setTimeout(async () => {
        expect(customElement.state.word).toMatch('first');
        await Router.to('/listeners1');

        customElement.shadowRoot?.querySelector('button')?.click();

        setTimeout(() => expect(customElement.state.word).toMatch('second'), 0);
      }, 0);
    }
  });

  test('Diffing element with text node', async () => {
    Router.add({
      path: '/diff-element-text-node:digit:?',
      view() {
        return html` <my-diff></my-diff> `;
      },
    });

    class MyDiff extends WebComponent<{ word: string }> {
      constructor() {
        super();

        this.state = {
          word: '',
        };
      }

      template() {
        return html`<template>
          ${Router.current.parameters &&
          Router.current.parameters[1] === undefined
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

    await Router.to('/diff-element-text-node');

    const customElement = document.querySelector<MyDiff>('my-diff');

    if (customElement) {
      expect(customElement.shadowRoot?.querySelector('button')).toBeFalsy();

      await Router.to('/diff-element-text-node1');

      customElement.shadowRoot?.querySelector('button')?.click();

      setTimeout(() => expect(customElement.state.word).toMatch('set'), 0);
    }
  });
});
