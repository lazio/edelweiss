import { createState, Router } from '../src';

const testState: { clicks: number; deletable?: boolean } = createState({
  clicks: 0,
  deletable: true,
});

describe('Tests for state', () => {
  beforeAll(() => {
    document.body.innerHTML = `<div class="app"></div>`;

    Router.add({
      path: '/',
      container: '.app',
      view() {
        return 'View';
      },
    });

    Router.to('/');
  });

  test('Getting from state value', () => {
    expect(testState.clicks).toBe(0);
  });

  test('Setting new value to state', () => {
    testState.clicks++;
    expect(testState.clicks).toBe(1);
  });

  test('Deleting property from state', () => {
    if (testState.deletable) {
      delete testState.deletable;
    }
    expect(testState.deletable).toBe(undefined);
  });
});
