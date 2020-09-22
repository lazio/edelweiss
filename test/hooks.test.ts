import './crypto_for_jest';
import { html, Router } from '../src';

let a = 1;

describe('Hooks', () => {
  let isMounted = false;
  let updateCount = 0;
  let isRemoved = false;
  let element: Element | null = null;
  let renderCount = 0;

  beforeAll(() => {
    document.body.innerHTML = '<div id="outer"></div>';

    Router.add([
      {
        path: '/',
        container: '#outer',
        view() {
          return html`<div>
            <span
              :rendered=${() => {
                renderCount++;
              }}
            ></span>
            <p
              :mounted=${(node: HTMLParagraphElement) => {
                element = node;
                isMounted = true;
              }}
              :updated=${() => updateCount++}
              :removed=${() => (isRemoved = true)}
              class=${a}
            ></p>
          </div>`;
        },
      },
      {
        path: '/r',
        container: '#outer',
        view() {
          return html`Hello`;
        },
      },
    ]);
  });

  test('Mounted hook', async () => {
    expect(isMounted).toBe(false);
    await Router.to('/');
    expect(isMounted).toBe(true);
    expect(element).toBeInstanceOf(HTMLElement);

    // If element is on the page, mounted hook must not be invoked.
    isMounted = false;
    await Router.reload();
    expect(isMounted).toBe(false);

    // Updated hook isn't invoked
    expect(updateCount).toBe(0);
    // Removed hook isn't invoked
    expect(isRemoved).toBe(false);
  });

  test('Rendered hook', async () => {
    /** Set to initial value because of previous test. */
    renderCount = 0;

    await Router.reload();

    // Because render hook is invoked in timeout, test must be also in setTimeout
    // function. Otherwise expect function will be invoked before rendered hook.
    setTimeout(() => expect(renderCount).toBe(1), 0);
  });

  test('Updated hook', async () => {
    a += 1;
    await Router.reload();

    expect(updateCount).toBe(1);
  });

  test('Removed hook', async () => {
    await Router.to('/r');

    expect(isRemoved).toBe(true);
  });
});
