import { html, Router, createState } from '../src';

type PageCase = 'both' | 'element' | 'text';

const state = createState({ clicks: 0, secondClicks: 0, thirdClicks: 0 });

function page(pageCase: PageCase) {
  return html`<div id="#app">
    ${pageCase === 'element'
      ? `<p>${state.clicks}</p>`
      : pageCase === 'text'
      ? `Clicks - ${state.secondClicks}`
      : `<p>${state.thirdClicks}</p>Clicks - ${state.thirdClicks}`}
  </div>`;
}

describe('Diff DOM', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>';

    Router.add([
      {
        path: '/text',
        container: '#app',
        view() {
          return page('text');
        },
      },
      {
        path: '/element',
        container: '#app',
        view() {
          return page('element');
        },
      },
      {
        path: '/ignored',
        container: '#app',
        view() {
          return html`
            <div>
              <p class="ign" data-ignored>Ignored</p>
              <p>Not ignored</p>
            </div>
          `;
        },
      },
      {
        path: '/',
        container: '#app',
        view() {
          return page('both');
        },
      },
    ]);
  });

  test('Update element nodes', async () => {
    await Router.to('/element');

    const app = document.querySelector('#app');

    if (app) {
      expect(app.innerHTML).toContain('<p>0</p>');

      state.clicks++;

      // Wait for end of reload method.
      setTimeout(() => {
        expect(app.innerHTML).toContain('<p>1</p>');
      }, 0);
    }
  });

  test('Updating text node', async () => {
    await Router.to('/text');

    const app = document.querySelector('#app');

    if (app) {
      expect(app.innerHTML).toContain('Clicks - 0');

      state.secondClicks++;

      // Wait for end of reload method.
      setTimeout(() => {
        expect(app.innerHTML).toContain('Clicks - 1');
      }, 0);
    }
  });

  test('Updating text node, when it has element nodes as siblings', async () => {
    await Router.to('/');

    const app = document.querySelector('#app');

    if (app) {
      expect(app.innerHTML).toContain('<p>0</p>');
      expect(app.innerHTML).toContain('Clicks - 0');

      state.thirdClicks++;

      // Wait for end of reload method.
      setTimeout(() => {
        expect(app.innerHTML).toContain('<p>1</p>');
        expect(app.innerHTML).toContain('Clicks - 1');
      }, 0);
    }
  });

  test('Element is not changed if it has data-ignored attributes', async () => {
    await Router.to('/ignored');

    const element = document.querySelector('.ign');
    if (element) {
      expect(element.childElementCount).toBe(0);

      element.append(document.createElement('span'));
      await Router.reload();

      expect(element.childElementCount).toBe(1);
    }
  });
});
