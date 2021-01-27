import './crypto_for_jest';
import { store } from '../build/index.js';

describe('store', () => {
  test('should reactively update value', () => {
    let updated = false;

    const reactive = store({ mark: false });

    reactive.subscribe('mark', (value) => (updated = value));

    expect(updated).toBe(false);

    reactive.mark(true);

    expect(updated).toBe(true);
  });

  test("should return store's value", () => {
    const reactive = store({ mark: false });

    expect(reactive.mark()).toBe(false);
  });

  test("should update store's value based on old one", () => {
    let updated = false;

    const reactive = store({ mark: false });

    reactive.subscribe('mark', (value) => (updated = value));

    reactive.mark((value) => !value);

    expect(updated).toBe(true);
  });

  test('should delete attached listener', () => {
    let updated = false;

    const reactive = store({ mark: false });

    const unsubscribe = reactive.subscribe(
      'mark',
      (value) => (updated = value)
    );
    unsubscribe();
    
    reactive.mark(true);
    expect(updated).toBe(false);
  });
});
