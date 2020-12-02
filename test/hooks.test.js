import './crypto_for_jest';
import { html, router } from '../build';

let a = 1;

/** Hooks are deffered, so expect function must be also deffered. */
function defer(fn) {
  setTimeout(fn, 0);
}

describe('Hooks', () => {
  let isMounted = false;
  let updateCount = 0;
  let isRemoved = false;
  let element = null;

  let hookIsInvoked = false;

  beforeAll(() => {
    document.body.innerHTML = '<div id="outer"></div>';

    router.add(
      {
        path: '/',
        container: '#outer',
        view() {
          return html`<div>
            <p
              :mounted=${(node) => {
                element = node;
                isMounted = true;
              }}
              :updated=${() => updateCount++}
              :removed=${() => (isRemoved = true)}
              class=${`${a}`}
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
      {
        path: '/only',
        container: '#outer',
        view() {
          return html` <div :mounted=${() => (hookIsInvoked = true)}></div> `;
        },
      },
    );
  });

  test('Mounted hook', async () => {
    expect(isMounted).toBe(false);
    await router.to('/');
    defer(() => expect(isMounted).toBe(true));
    defer(() => expect(element).toBeInstanceOf(HTMLParagraphElement));

    // If element is on the page, mounted hook must not be invoked.
    isMounted = false;
    await router.reload();
    defer(() => expect(isMounted).toBe(false));

    // Updated hook isn't invoked
    defer(() => expect(updateCount).toBe(0));
    // Removed hook isn't invoked
    defer(() => expect(isRemoved).toBe(false));
  });

  test('Updated hook', async () => {
    a += 1;
    await router.reload();

    defer(() => expect(updateCount).toBe(1));
  });

  test('Removed hook', async () => {
    await router.to('/r');

    defer(() => expect(isRemoved).toBe(true));
  });

  test('Updated hook does not invokes on changing library attributes value', async () => {
    await router.to('/');
    await router.reload();
    await router.reload();
    await router.reload();

    defer(() => expect(updateCount).toBe(1));
  });

  test('Mounted are applied, if they are only attributes of elements', async () => {
    expect(hookIsInvoked).toBe(false);

    await router.to('/only');

    defer(() => expect(hookIsInvoked).toBe(true));
  });
});
