import Router from '../router/router';
import {
  maybeOf,
  keys,
  forEach,
  path as pathOf,
  reduce,
  entries,
} from '@fluss/core';
import { panic } from '../utils/panic';

export type I18nLanguage = {
  [key: string]: string | { [key: string]: I18nLanguage };
};

export type I18nLanguagesSet = {
  [tag: string]: I18nLanguage;
};

/**
 * Holds all languages files that pass to I18n by "I18n.add()".
 */
const _languages: I18nLanguagesSet = {};
/**
 * Holds current language tag.
 */
let _currentLanguage: string = '';

export default class I18n {
  static get currentLanguage(): string {
    return _currentLanguage;
  }

  static get languagesTags(): ReadonlyArray<string> {
    return keys(_languages);
  }

  static add(languages: I18nLanguagesSet, initial?: string): void {
    forEach(keys(languages), (lang, index) => {
      !_currentLanguage && index === 0 && (_currentLanguage = initial || lang);
      // Do not override language file if it is already exists
      _languages[lang] || (_languages[lang] = languages[lang]);
    });
  }

  static setLanguage(tag: string): void {
    maybeOf(_languages[tag]).map(() => {
      /**
       * Change lang attribute of html element.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
       */
      document.documentElement.setAttribute('lang', tag);
      _currentLanguage = tag;
      Router.reload();
    });
  }

  static translate(path: string, variables: { [key: string]: string } = {}) {
    return maybeOf(_currentLanguage)
      .map((lang) => _languages[lang])
      .chain((translationObjectOrText) =>
        // Getting text from translation object.
        pathOf<string>(path, translationObjectOrText)
      )
      .map((translatedText) => {
        if (typeof translatedText !== 'string') {
          panic(`Path "${path}" does not match any translation!
          Check "path" - it must point to plain text in object hierarchy.`);
        }

        return translatedText;
      })
      .map((text) => {
        // Replacing variables in translated text.
        return reduce(
          entries(variables),
          (maybeText, nameAndValue) =>
            insertVariables(maybeText, ...nameAndValue),
          text
        );
      })
      .extract();
  }
}

// Inserts variable into text if it has any. Otherwise returns original text
function insertVariables(
  text: string,
  variableName: string,
  variableValue: string
): string {
  return text.search(`\\$\\{${variableName}\\}`) !== -1
    ? insertVariables(
        text.replace(`\${${variableName}}`, variableValue),
        variableName,
        variableValue
      )
    : text;
}
