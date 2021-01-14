import './crypto_for_jest';
import { html, router, future } from '../build';

describe('Test "router"', () => {
  beforeAll(() => {
    document.body.innerHTML = '<p class="page"></p><a href="#u"></a>';
  });

  test('"router.current" before "router.to" must to have default error route."', () => {
    expect(router.current.path).toEqual('.+');
    expect(router.current.view()).toMatch('<b>There is no route that match ');
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

  test('should lazily load asyncronous html', async () => {
    const asyncChild = () => Promise.resolve(5);

    router.add({
      path: '/async',
      view() {
        return html`
          <div class="async-child">Child ${future(asyncChild())}</div>
        `;
      },
    });

    await router.to('/async');

    const div = document.querySelector('.async-child');
    expect(div).toBeDefined();
    setTimeout(() => expect(div.innerHTML).toMatch('Child 5'), 0);
  });

  test('should lazily load asyncronous html and attach listeners', async () => {
    let clicked = false;

    const asyncChild = () =>
      Promise.resolve(html`<button @click=${() => (clicked = true)}></button>`);

    router.add({
      path: '/async-button',
      view() {
        return html` <div class="async-child">${future(asyncChild())}</div> `;
      },
    });

    await router.to('/async-button');

    const button = document.querySelector('.async-child button');
    expect(button).toBeDefined();
    setTimeout(() => {
      button.click();
      expect(clicked).toBe(true);
    }, 0);
  });

  test('should lazily load asyncronous html and show stub component', async () => {
    const asyncChild = () => Promise.resolve(html`<button>Button</button>`);

    router.add({
      path: '/async-stub',
      view() {
        return html`
          <div class="async-child">${future(asyncChild(), html`<a>A</a>`)}</div>
        `;
      },
    });

    await router.to('/async-stub');

    const a = document.querySelector('.async-child a');
    expect(a).toBeDefined();

    setTimeout(() => {
      const button = document.querySelector('.async-child button');
      const a = document.querySelector('.async-child a');

      expect(button).toBeDefined();
      expect(a).toBeNull();
    }, 0);
  });

  test('should load asynchronous component inside another async component', async () => {
    const a = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(html`<span>foo</span>`), 3000)
      );
    const b = () => Promise.resolve(html`<p>${future(a())} baz</p>`);

    router.add({
      path: '/async-nested',
      view() {
        return html` <div class="async-child">${future(b())}</div> `;
      },
    });

    await router.to('/async-nested');

    setTimeout(() => {
      const p = document.querySelector('.async-child p');
      expect(p).toBeDefined();
      expect(p.innerHTML).toMatch('<div.+');
      expect(p.innerHTML).toMatch('baz');
      expect(p.innerHTML).toMatch('foo');
    }, 0);
  });
});
