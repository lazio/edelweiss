import './crypto_for_jest';
import {
  translate,
  setLanguage,
  addTranslation,
  getCurrentLanguage,
  getSupportedLanguages,
} from '../build';

describe('internationalization', () => {
  test('getSupportedLanguages should return empty array if no translation object were added.', () => {
    expect(getSupportedLanguages()).toEqual([]);
  });

  test('addTranslation method should add translation object to supported languages.', () => {
    addTranslation('en', { key: 'value' });
    expect(getSupportedLanguages()).toEqual(['en']);
  });

  test("getCurrentLanguage should return browser's preffered language if setLanguage function was never invoked.", () => {
    expect(getCurrentLanguage()).toBe(window.navigator.language);
  });

  test('setLanguage change current language', () => {
    setLanguage('uk');
    expect(getCurrentLanguage()).toBe('uk');
  });

  test('translate should return undefined if path parts resolve to not existed translation text', () => {
    expect(translate('foo.baz').value).toBe(undefined);
  });

  test('translate should return text with a valid path parts', () => {
    setLanguage('en');
    expect(translate('key').value).toBe('value');
  });

  test('translate should return an object when path parts are too short.', () => {
    addTranslation('by', { foo: { bar: { baz: 'odoo' } } });
    setLanguage('by');
    expect(translate('foo.bar').value).toEqual({ baz: 'odoo' });
  });

  test('translate method should insert variables into text', () => {
    addTranslation('en', { foo: 'bar {baz}' });
    setLanguage('en');
    expect(translate('foo', { baz: 'odoo' }).value).toMatch('bar odoo');
  });
});
