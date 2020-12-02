import './crypto_for_jest';
import { html, router } from '../build';

describe('Test "router"', () => {
  beforeAll(() => {
    document.body.innerHTML = '<p class="page"></p><a href="#u"></a>';
  });

  test('"router.current" before "router.to" must to have default error route."', () => {
    expect(router.current.path).toEqual('/no-route-found');
    expect(router.current.view()).toMatch(
      '<b>There is no route that match "/" path.</b>'
    );
  });

  test('"router.to" must use global "container" if there is no local one', async () => {
    router.configure({ container: '.page ' });
    router.add(
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
      }
    );

    await router.to('/');

    expect(document.body.innerHTML).toMatch('Start');
  });

  test('"router.to" must update "container" element with children that are returned from "Route.view()"', async () => {
    await router.to('/test');

    const container = document.querySelector('.page');

    expect(container.innerHTML).toMatch('Test');
  });

  test('"router.to" must not throw an error if container is not exist', () => {
    expect(router.to('/not-found')).resolves.not.toThrow();
  });

  test('Navigating to any links without setting state, does not throw error', () => {
    const a = document.querySelector('a');

    expect(() => a.click()).not.toThrow();
  });

  test('Conditional rendering', async () => {
    let clicked = 0;

    router.add({
      path: '/conditional',
      view() {
        return html`
          <div>
            ${router.current.path.includes('/conditional')
              ? html`<button class="btn" @click=${() => clicked++}>
                  Button
                </button>`
              : ''}
          </div>
        `;
      },
    });

    await router.to('/conditional');

    const button = document.querySelector('.btn');
    expect(button).toBeTruthy();

    button.click();

    expect(clicked).toBe(1);
  });
});
