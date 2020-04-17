// @flow

import Router from '../router/router.mjs'

export type I18nLanguage = {
  [string]: string | { [string]: I18nLanguage },
}

export type I18nLanguagesSet = {
  [string]: I18nLanguage,
}

/**
 * Holds all languages files that pass to I18n by "I18n.add()".
 */
const _languages: I18nLanguagesSet = {}
/**
 * Holds current language tag.
 */
let _currentLanguage: string | void

export default class I18n {
  static get currentLanguage() {
    return _currentLanguage
  }

  static get languagesTags(): string[] {
    return Object.keys(_languages)
  }

  static add(languages: I18nLanguagesSet, initial?: string) {
    for (const lang in languages) {
      // Do not override language file if it is already exists
      if (!(lang in _languages)) {
        _languages[lang] = languages[lang]
      }
    }

    const tmp = Object.keys(languages)
    _currentLanguage = initial || tmp[0]
  }

  static setLanguage(tag: string) {
    const translation = _languages[tag]

    if (!translation) {
      console.error(`You do not have translation for ${tag} language!`)
    } else {
      /**
       * Change lang attribute of html element.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
       */
      if (document.documentElement) {
        document.documentElement.setAttribute('lang', tag)
      }
      _currentLanguage = tag
      Router.reload()
    }
  }

  static translate(path: string, variables?: { [string]: string }): string {
    if (_currentLanguage) {
      const splitted = path.split('.')

      if (_currentLanguage in _languages) {
        let maybeText = _languages[_currentLanguage]

        splitted.forEach(part => {
          /**
           * Check for all possible incorrect values, so this method will not
           * interrupt site flow.
           */
          if (typeof maybeText !== 'string') {
            if (maybeText === undefined || maybeText === null) {
              console.error(`Path "${path}" does not match any translation!
              Check "path" - it must point to plain text in object hierarchy.`)
              maybeText = ''
            } else if (Array.isArray(maybeText)) {
              console.error(`Array type is not allowed as translate value!
              Given "[${maybeText.join(', ')}]" for path: "${path}"`)
              maybeText = ''
            } else if (typeof maybeText === 'function') {
              console.error(`Function type is not allowed as translate value!
              Given "${maybeText}" for path: "${path}"`)
              maybeText = ''
            } else if (
              typeof maybeText === 'number' ||
              typeof maybeText === 'boolean'
            ) {
              console.error(`Number or boolean type is not allowed as translate value!
              Given "${typeof maybeText}: ${maybeText}" for path: "${path}"`)
              maybeText = ''
            } else {
              maybeText = maybeText[part]
            }
          }
        })

        if (typeof maybeText !== 'string') {
          maybeText = ''
          console.error(`Path "${path}" does not match any translation!
          Check "path" parameter - it must point to plain text in object hierarchy.`)
        }

        if (variables) {
          for (const key in variables) {
            maybeText = insertVariables(maybeText, key, variables[key])
          }
        }

        return maybeText
      } else {
        console.error(`You does not set "${_currentLanguage}" language file,
        so empty translate for "${path}" is returned.`)
        return ''
      }
    } else {
      console.error(`You does not add languages to "I18n"("I18n.add(...)")
      or does not set language through "I18n.setLanguage(...)",
      so empty translate for "${path}" is returned.`)
      return ''
    }
  }
}

// Inserts variable into text if it has any. Otherwise returns original text
function insertVariables(
  text: string,
  variableName: string,
  variableValue: string
): string {
  if (text.search(`\\$\\{${variableName}\\}`) !== -1) {
    const replacedText = text.replace(`\${${variableName}}`, variableValue)
    return insertVariables(replacedText, variableName, variableValue)
  } else {
    return text
  }
}
