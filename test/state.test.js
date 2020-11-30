import { createState, Router } from '../build';

const testState = createState({
  clicks: 0,
  deletable: true,
});

let renderCount = 0;

describe('Tests for state', () => {
  beforeAll(() => {
    document.body.innerHTML = `<div class="app"></div>`;

    Router.add({
      path: '/',
      container: '.app',
      view() {
        renderCount++;
        return 'View';
      },
    });

    // First render.
    Router.to('/');
  });

  test('Getting value from state.', () => {
    expect(testState.clicks).toBe(0);
  });

  test('Setting new value to state.', () => {
    // Second render.
    testState.clicks++;
    expect(testState.clicks).toBe(1);
  });

  test('Setting same value to state does not cause rerender.', () => {
    // No render.
    testState.clicks = testState.clicks;
    expect(renderCount).toBe(2);
  });

  test('Deleting property from state.', () => {
    // Third render.
    delete testState.deletable;
    expect(testState.deletable).toBe(undefined);
  });

  test('Deleting non existent property from state does not cause an error and rerender.', () => {
    expect(() => delete testState.deletable).not.toThrow();
    expect(renderCount).toBe(3);
  });
});
