// @flow

import Match from '../utils/monads/match.mjs'
import Maybe from '../utils/monads/maybe.mjs'
import Router from '../router/router.mjs'
import { log } from '../logger/logger.mjs'

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
        log(`You do not have translation for ${tag} language!`)
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
      .mapNothing(() => {
        log(`You does not add languages to "I18n"("I18n.add(...)")
        or does not set language through "I18n.setLanguage(...)",
        so empty translate for "${path}" is returned.`)
      })
      .map((lang) => _languages[lang])
      .mapNothing(() => {
        // $FlowFixMe
        log(`You does not set "${_currentLanguage}" language file,
            so empty translate for "${path}" is returned.`)
      })
      .map((translationObjectOrText) => {
        // Getting text from translation object.
        return path
          .split('.')
          .reduce((translationObjectOrText, part, index, array) => {
            return typeof translationObjectOrText === 'string'
              ? translationObjectOrText
              : /**
                 * Check for all possible incorrect values, so this method will not
                 * interrupt site flow.
                 */
                Match.of(translationObjectOrText[part])
                  .on(
                    (next) => next === undefined || next === null,
                    () => {
                      log(`Path "${path}" does not match any translation!
              Check "path" - it must point to plain text in object hierarchy.`)
                      return ''
                    }
                  )
                  .on(
                    (next) => Array.isArray(next),
                    (next) => {
                      log(`Array type is not allowed as translate value!
              Given "[${next.join(', ')}]" for path: "${path}"`)
                      return ''
                    }
                  )
                  .on(
                    (next) => next === 'function',
                    (next) => {
                      log(`Function type is not allowed as translate value!
              Given "${next}" for path: "${path}"`)
                      return ''
                    }
                  )

                  .on(
                    (next) =>
                      typeof translationObjectOrText === 'number' ||
                      typeof translationObjectOrText === 'boolean',
                    (next) => {
                      log(`Number or boolean type is not allowed as translate value!
              Given "${typeof next}: ${next}" for path: "${path}"`)
                      return ''
                    }
                  )
                  .extract()
          }, translationObjectOrText)
      })
      .map((translatedText) => {
        return typeof translatedText === 'string'
          ? translatedText
          : (log(`Path "${path}" does not match any translation!
              Check "path" - it must point to plain text in object hierarchy.`),
            '')
      })
      .map((text) => {
        return Object.entries(variables).reduce(
          // Replacing variables in translated text.
          (maybeText, nameAndValue) =>
            insertVariables(maybeText, ...nameAndValue),
          text
        )
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
