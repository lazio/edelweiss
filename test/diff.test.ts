import './crypto_for_jest';
import {
  html,
  Router,
  createState,
  WebComponent,
  defineWebComponent,
} from '../src';

type PageCase = 'both' | 'button' | 'text';

const state = createState({ clicks: 0, secondClicks: 0, thirdClicks: 0 });

function page(pageCase: PageCase) {
  return html`
    ${pageCase === 'button'
      ? `<p>${state.clicks}</p>`
      : pageCase === 'text'
      ? `Clicks - ${state.secondClicks}`
      : `<p>${state.thirdClicks}</p>Clicks - ${state.thirdClicks}`}
  `;
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
        path: '/button',
        container: '#app',
        view() {
          return page('button');
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

  test('Update button nodes', async () => {
    await Router.to('/button');

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

  test('Updating text node, when it has button nodes as siblings', async () => {
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

    const button = document.querySelector('.ign');
    if (button) {
      expect(button.childElementCount).toBe(0);

      button.append(document.createElement('span'));
      await Router.reload();

      expect(button.childElementCount).toBe(1);
    }
  });

  test('Set proper event listeners', async () => {
    let firstResult = 0;
    let secondResult = 0;

    Router.add({
      path: '/events:number:?',
      container: '#app',
      view() {
        return html`
          <div>
            ${Router.current.parameters && Router.current.parameters[1]
              ? html`<button @click=${() => firstResult++}>A</button>`
              : html`<button @click=${() => secondResult++}>B</button>`}
          </div>
        `;
      },
    });

    await Router.to('/events');

    let button = document.querySelector('button');
    if (button) {
      button.click();
      expect(firstResult).toBe(0);
      expect(secondResult).toBe(1);

      await Router.to('/events3');

      button = document.querySelector('button');
      if (button) {
        button.click();

        expect(firstResult).toBe(1);
        expect(secondResult).toBe(1);
      }
    }
  });

  test('Adding events to children of new node', async () => {
    let inner = false;

    Router.add({
      path: '/child-events',
      container: '#app',
      view() {
        return html`
          <main>
            <div>
              <button class="inner" @click=${() => (inner = true)}></button>
            </div>
          </main>
        `;
      },
    });

    await Router.to('/child-events');

    const innerBtn = document.querySelector<HTMLButtonElement>('button.inner');

    if (innerBtn) {
      innerBtn.click();
      expect(inner).toBe(true);
    }
  });

  test('diff attributes of custom element', async () => {
    class CustomElement extends WebComponent {
      template() {
        return html` <span>Custom Element</span> `;
      }
    }

    defineWebComponent('my-custom', CustomElement);

    let count = 0;

    Router.add({
      path: '/custom-element-diff',
      container: '#app',
      view() {
        return html` <my-custom count="${count}"></my-custom> `;
      },
    });

    await Router.to('/custom-element-diff');
    expect(document.body.innerHTML).toMatch(/count="0"/);

    count++;

    await Router.reload();
    expect(document.body.innerHTML).toMatch(/count="1"/);
  });

  test('Diffing value property', async () => {
    let valueString = '';
    let valueNumber = 0;
    let valueFunction = () => valueString + valueNumber;

    Router.add({
      path: '/value-attr',
      container: '#app',
      view() {
        return html`
          <input id="a" .value=${valueString} />
          <input id="b" .value=${valueNumber} />
          <input id="c" .value=${valueFunction} />
        `;
      },
    });

    await Router.to('/value-attr');

    const input1 = document.querySelector<HTMLInputElement>('#a');
    const input2 = document.querySelector<HTMLInputElement>('#b');
    const input3 = document.querySelector<HTMLInputElement>('#c');

    if (input1) {
      expect(input1.value).toBe('');
    }
    if (input2) {
      expect(input2.value).toBe('0');
    }
    if (input3) {
      expect(input3.value).toBe('0');
    }

    valueString = 'some';
    valueNumber = 1;

    await Router.reload();

    if (input1) {
      expect(input1.value).toBe('some');
    }
    if (input2) {
      expect(input2.value).toBe('1');
    }
    if (input3) {
      expect(input3.value).toBe('some1');
    }
  });
});
