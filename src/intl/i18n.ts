import { render } from '../dom/render';
import { current } from '../router/router';

type LanguageObject = {
  [key: string]: string | LanguageObject;
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
    if (currentLanguage === undefined && index === 0) {
      currentLanguage = initial ?? lang;
    }

    _languages[lang] = languages[lang];
  });
}

/** Change current language of view. */
export function setLanguage(tag: string): void {
  if (_languages[tag] !== undefined) {
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
  if (currentLanguage === undefined) {
    console.warn(
      'Current language is not defined. Maybe you forgot to add language objects?'
    );

    return '';
  } else {
    const translationObjectOrText: LanguageObject | undefined =
      _languages[currentLanguage];

    if (translationObjectOrText === undefined) {
      console.warn(
        `There is no translations for '${currentLanguage}' language!`
      );

      return '';
    } else {
      const result = getTranslationValue(
        translationObjectOrText,
        path.split('.')
      );

      // Replacing variables in translated text.
      return Object.entries(variables).reduce(
        (maybeText, nameAndValue) =>
          insertVariables(maybeText, ...nameAndValue),
        result
      );
    }
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

function getTranslationValue(
  target: LanguageObject | string,
  properties: ReadonlyArray<string>
): string {
  if (typeof target === 'string') {
    return target;
  }

  if (properties.length === 0 || target[properties[0]] === undefined) {
    console.warn('Parts of "path" argument do not link to translation value!');

    return '';
  }

  return getTranslationValue(target[properties[0]], properties.slice(1));
}
