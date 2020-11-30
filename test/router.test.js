import './crypto_for_jest';
import { html, Router } from '../build';

describe('Test "Router"', () => {
  beforeAll(() => {
    document.body.innerHTML = '<p class="page"></p><a href="#u"></a>';
  });

  test('"Router.current" before "Router.to" must to have empty values in "path" and "view()"', () => {
    expect(Router.current.path).toEqual('');
    expect(Router.current.view()).toEqual('');
  });

  test('"Router.to" before "Router.add" must not throw an Error', () => {
    expect(Router.to('/')).resolves.not.toThrow();
  });

  test('"Router.to" must use global "container" if there is no local one', () => {
    Router.configure({ container: '.page ' });
    Router.add([
      {
        path: '/',
        view() {
          return 'Start';
        },
      },
      {
        path: '/test',
        view() {
          return 'Test';
        },
      },
      {
        path: '/not-found',
        container: '.no-element',
        view() {
          return 'No such element';
        },
      },
    ]);

    expect(Router.to('/test')).resolves.toBe(undefined);
  });

  test('"Router.to" must update "container" element with children that returns from "Route.view()"', async () => {
    await Router.to('/test');

    const container = document.querySelector('.page');

    if (container) {
      expect(container.innerHTML).toMatch('Test');
    }
  });

  test('"Router.to" must not throw an error if container is not exist', () => {
    expect(Router.to('/not-found')).resolves.not.toThrow();
  });

  test('Navigating to any links without setting state, does not throw error', () => {
    const a = document.querySelector('a');
    if (a) {
      expect(() => a.click()).not.toThrow();
    }
  });

  test('Prefix path must be checked internally and users can navigate to path with or without prefix', async () => {
    Router.configure({ prefix: '/pre' });
    Router.add({
      path: '/pre/fix',
      view() {
        return 'Prefix page';
      },
    });

    await Router.to('/pre/fix');
    const pageElement = document.body.querySelector('.page');

    if (pageElement) {
      expect(pageElement.innerHTML).toBe('Prefix page');
    }

    await Router.to('/');
    await Router.to('/fix');

    if (pageElement) {
      expect(pageElement.innerHTML).toBe('Prefix page');
    }
  });

  test('Conditional rendering', async () => {
    let clicked = 0;

    Router.add({
      path: '/conditional',
      view() {
        return html`
          <div>
            ${Router.current.path.includes('/conditional')
              ? html`<button class="btn" @click=${() => clicked++}>
                  Button
                </button>`
              : ''}
          </div>
        `;
      },
    });

    await Router.to('/conditional');

    const button = document.querySelector('.btn');
    expect(button).toBeTruthy();

    if (button) {
      button.click();

      expect(clicked).toBe(1);
    }
  });
});
