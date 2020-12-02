import './crypto_for_jest';
import {
  html,
  router,
  createState,
  WebComponent,
  defineWebComponent,
} from '../build';

const state = createState({ clicks: 0, secondClicks: 0, thirdClicks: 0 });

function page(pageCase) {
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

    router.configure({container: '#app'})

    router.add(
      {
        path: '/text',
        view() {
          return page('text');
        },
      },
      {
        path: '/button',

        view() {
          return page('button');
        },
      },
      {
        path: '/ignored',

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

        view() {
          return page('both');
        },
      },
    );
  });

  test('Update button nodes', async () => {
    await router.to('/button');

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
    await router.to('/text');

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
    await router.to('/');

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
    await router.to('/ignored');

    const button = document.querySelector('.ign');
    if (button) {
      expect(button.childElementCount).toBe(0);

      button.append(document.createElement('span'));
      await router.reload();

      expect(button.childElementCount).toBe(1);
    }
  });

  test('Set proper event listeners', async () => {
    let firstResult = 0;
    let secondResult = 0;

    router.add({
      path: '/events(\\d+)?',
      view() {
        return html`
          <div>
            ${router.current.parameters && router.current.parameters[1]
              ? html`<button @click=${() => firstResult++}>A</button>`
              : html`<button @click=${() => secondResult++}>B</button>`}
          </div>
        `;
      },
    });

    await router.to('/events');

    let button = document.querySelector('button');
    if (button) {
      button.click();
      expect(firstResult).toBe(0);
      expect(secondResult).toBe(1);

      await router.to('/events3');

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

    router.add({
      path: '/child-events',
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

    await router.to('/child-events');

    const innerBtn = document.querySelector('button.inner');

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

    router.add({
      path: '/custom-element-diff',
      view() {
        return html` <my-custom count="${count}"></my-custom> `;
      },
    });

    await router.to('/custom-element-diff');
    expect(document.body.innerHTML).toMatch(/count="0"/);

    count++;

    await router.reload();
    expect(document.body.innerHTML).toMatch(/count="1"/);
  });

  test('Diffing value property', async () => {
    let valueString = '';
    let valueNumber = 0;
    let valueFunction = () => valueString + valueNumber;

    router.add({
      path: '/value-attr',
      view() {
        return html`
          <input id="a" .value=${valueString} />
          <input id="b" .value=${valueNumber} />
          <input id="c" .value=${valueFunction} />
        `;
      },
    });

    await router.to('/value-attr');

    const input1 = document.querySelector('#a');
    const input2 = document.querySelector('#b');
    const input3 = document.querySelector('#c');

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

    await router.reload();

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

  test('Event listener is added to element, if there is only event attributes', async () => {
    let clicked = false;

    router.add({
      path: '/one-listener',
      view() {
        return html` <button @click=${() => (clicked = true)}>click</button> `;
      },
    });

    await router.to('/one-listener');

    expect(clicked).toBe(false);

    const button = document.querySelector('button');
    if (button) {
      button.click();
    }

    expect(clicked).toBe(true);
  });
});
