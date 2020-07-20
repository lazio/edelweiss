// @flow

import Match from '../utils/algebraic/match.mjs'
import Maybe from '../utils/algebraic/maybe.mjs'
import Router from '../router/router.mjs'

export type I18nLanguage = {
  [key: string]: string | { [key: string]: I18nLanguage },
}

export type I18nLanguagesSet = {
  [tag: string]: I18nLanguage,
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
    Object.keys(languages).forEach((lang, index) => {
      !_currentLanguage && index === 0 && (_currentLanguage = initial || lang)
      // Do not override language file if it is already exists
      _languages[lang] || (_languages[lang] = languages[lang])
    })
  }

  static setLanguage(tag: string) {
    Maybe.of(_languages[tag])
      .mapNothing(() => {
        throw new Error(`You do not have translation for ${tag} language!`)
      })
      .map(() => {
        /**
         * Change lang attribute of html element.
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
         */
        Maybe.of(document.documentElement).map((el) =>
          el.setAttribute('lang', tag)
        )
        _currentLanguage = tag
        Router.reload()
      })
  }

  static translate(
    path: string,
    variables?: { [key: string]: string } = {}
  ): string {
    return Maybe.of(_currentLanguage)
      .map((lang) => {
        return Maybe.of(_languages[lang])
          .map((maybeText) => {
            return Object.entries(variables).reduce(
              // Replacing variables in translated text.
              (maybeText, [key, value]) => {
                return typeof maybeText === 'string'
                  ? // $FlowFixMe
                    insertVariables(maybeText, key, value)
                  : ''
              },
              // Getting text from translation object.
              path.split('.').reduce((maybeText, part, index, array) => {
                return typeof maybeText === 'string'
                  ? maybeText
                  : /**
                     * Check for all possible incorrect values, so this method will not
                     * interrupt site flow.
                     */
                    Match.of(maybeText[part])
                      .on(
                        (next) => next === undefined || next === null,
                        () => {
                          throw new Error(`Path "${path}" does not match any translation!
              Check "path" - it must point to plain text in object hierarchy.`)
                        }
                      )
                      .on(
                        (next) => Array.isArray(next),
                        (next) => {
                          throw new Error(`Array type is not allowed as translate value!
              Given "[${next.join(', ')}]" for path: "${path}"`)
                        }
                      )
                      .on(
                        (next) => next === 'function',
                        (next) => {
                          throw new Error(`Function type is not allowed as translate value!
              Given "${next}" for path: "${path}"`)
                        }
                      )

                      .on(
                        (next) =>
                          typeof maybeText === 'number' ||
                          typeof maybeText === 'boolean',
                        (next) => {
                          throw new Error(`Number or boolean type is not allowed as translate value!
              Given "${typeof next}: ${next}" for path: "${path}"`)
                        }
                      )
                      .on(
                        (next) =>
                          typeof next !== 'string' &&
                          index === array.length - 1,
                        (next) => {
                          throw new Error(`Path "${path}" does not match any translation!
              Check "path" - it must point to plain text in object hierarchy.`)
                        }
                      )
                      .extract()
              }, maybeText)
            )
          })
          .mapNothing(() => {
            throw new Error(`You does not set "${lang}" language file,
            so empty translate for "${path}" is returned.`)
          })
          .extract()
      })
      .mapNothing(() => {
        throw new Error(`You does not add languages to "I18n"("I18n.add(...)")
        or does not set language through "I18n.setLanguage(...)",
        so empty translate for "${path}" is returned.`)
      })
      .extract()
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
    : text
}
