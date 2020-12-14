import { render } from '../dom/render';
import { current } from '../router/router';
import { maybe, isNothing, path as pathOf } from '@fluss/core';

type LanguageObject = {
  [key: string]: string | { [key: string]: LanguageObject };
};

/**
 * Describe languages object.
 * Keys must be language identifiers (by example `en`, `uk`, `fr` etc.).
 */
export type Languages = {
  [tag: string]: LanguageObject;
};

/** Holds all languages files that pass to i18n by "i18n.add()". */
const _languages: Languages = {};

/** Holds current language tag. */
export let currentLanguage: string | undefined = undefined;

export function languagesTags(): ReadonlyArray<string> {
  return Object.keys(_languages);
}

/** Add language pack. */
export function add(languages: Languages, initial?: string): void {
  Object.keys(languages).forEach((lang, index) => {
    if (isNothing(currentLanguage) && index === 0) {
      currentLanguage = initial ?? lang;
    }

    _languages[lang] = languages[lang];
  });
}

/** Change current language of view. */
export function setLanguage(tag: string): void {
  if (!isNothing(_languages[tag])) {
    /**
     * Change lang attribute of html element.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
     */
    document.documentElement.setAttribute('lang', tag);
    currentLanguage = tag;

    render(current.container, current.view());
  } else {
    console.warn(`There is no translations for '${tag}' language!`);
  }
}

/** Returns translated text based on _path_. */
export function translate(
  path: string,
  variables: { [key: string]: string } = {}
): string {
  return (
    maybe(currentLanguage)
      .map((lang) => _languages[lang])
      .chain((translationObjectOrText) =>
        // Getting text from translation object.
        pathOf<string>(path, translationObjectOrText)
      )
      .map((translatedText) => {
        if (typeof translatedText !== 'string') {
          console.warn(`Path "${path}" does not match any translation!
        Check "path" - it must point to plain text in object hierarchy.`);
          return '';
        }

        return translatedText;
      })
      .map((text) => {
        // Replacing variables in translated text.
        return Object.entries(variables).reduce(
          (maybeText, nameAndValue) =>
            insertVariables(maybeText, ...nameAndValue),
          text
        );
      })
      .extract() ?? ''
  );
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
