import { reactive } from './core/reactive';
import type { Dependency } from './core/dependency';

/** Describe common shape of translation object. */
export interface Translation {
  [key: string]: string | Translation;
}

const translations: Record<string, Translation> = {};
const language = reactive({ value: window.navigator.language });

/** Change current language. */
export const setLanguage = (code: string): void => language.value(code);

/** Return current translation language. */
export const getCurrentLanguage = (): string =>
  language.value((code) => code).value;

/** Add translation object as supported language. */
export const addTranslation = (
  language: string,
  translation: Translation
): void => {
  translations[language] = translation;
};

const insertVariables = (to: string, variable: string, value: string): string =>
  to.replace(new RegExp(`{\\s*${variable}\\s*}`, 'g'), value);

/**
 * Get translated text based on _path_ parts.
 * Parts must be joined with points. Example: `foo.baz`.
 *
 * Translated text can be provided with variables within.
 * For that define translation endpoint with `{ variableName }` syntax
 * and pass second argument to this method like: `{ variableName: 'some value' }`.
 */
export const translate = (
  path: string,
  variables: Record<string, string> = {}
): Dependency<string, undefined | string | Translation> =>
  language.value((languageCode) =>
    Object.entries(variables).reduce<undefined | string | Translation>(
      (translated, [variable, value]) =>
        typeof translated === 'string'
          ? insertVariables(translated, variable, value)
          : translated,
      path
        .split('.')
        .reduce<undefined | string | Translation>(
          (translated, current) =>
            !translated || typeof translated === 'string'
              ? translated
              : translated[current],
          translations[languageCode]
        )
    )
  );

/** Return codes of all supported languages. */
export const getSupportedLanguages = (): ReadonlyArray<string> =>
  Object.keys(translations);
