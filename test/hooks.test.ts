import './crypto_for_jest';
import { html, Router } from '../src';

let a = 1;

/** Hooks are deffered, so expect function must be also deffered. */
function defer(fn: () => void): void {
  setTimeout(fn, 0);
}

describe('Hooks', () => {
  let isMounted = false;
  let updateCount = 0;
  let isRemoved = false;
  let element: Element | null = null;

  beforeAll(() => {
    document.body.innerHTML = '<div id="outer"></div>';

    Router.add([
      {
        path: '/',
        container: '#outer',
        view() {
          return html`<div>
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
    defer(() => expect(isMounted).toBe(true));
    defer(() => expect(element).toBeInstanceOf(HTMLElement));

    // If element is on the page, mounted hook must not be invoked.
    isMounted = false;
    await Router.reload();
    defer(() => expect(isMounted).toBe(false));

    // Updated hook isn't invoked
    defer(() => expect(updateCount).toBe(0));
    // Removed hook isn't invoked
    defer(() => expect(isRemoved).toBe(false));
  });

  test('Updated hook', async () => {
    a += 1;
    await Router.reload();

    defer(() => expect(updateCount).toBe(1));
  });

  test('Removed hook', async () => {
    await Router.to('/r');

    defer(() => expect(isRemoved).toBe(true));
  });

  test('Updated hook does not invokes on changing library attributes value', async () => {
    await Router.to('/');
    await Router.reload();
    await Router.reload();
    await Router.reload();

    defer(() => expect(updateCount).toBe(1));
  });
});
