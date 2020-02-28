// @flow

import Router from '../router/router.mjs'

export type I18nLanguage = {
  [string]: string | { [string]: I18nLanguage }
}

export type I18nLanguagesSet = {
  [string]: I18nLanguage
}

export default class I18n {
  static _languages: I18nLanguagesSet
  static currentLanguage: string

  static add(languages: I18nLanguagesSet, initial?: string) {
    I18n._languages = languages

    const tmp = Object.entries(languages)
    I18n.currentLanguage = initial || tmp[0][0]
  }

  static setLanguage(tag: string) {
    const translation = I18n._languages[tag]

    if (!translation) {
      console.error(`You do not have translation for ${tag} language!`)
    } else {
      I18n.currentLanguage = tag
      Router.reload()
    }
  }

  static get languagesTags(): string[] {
    return Object.keys(I18n._languages)
  }

  static translate(path: string, variables?: { [string]: string }): string {
    const splitted = path.split('.')
    let maybeText = I18n._languages[I18n.currentLanguage]

    splitted.forEach(part => {
      if (typeof maybeText !== 'string') {
        maybeText = maybeText[part]
      }
    })

    if (typeof maybeText !== 'string') {
      maybeText = ''
      console.error(`Path ${path} does not match any translation!
      Check "path" - it must point to plain text in object hierarchy.`)
    }

    if (variables) {
      for (const key in variables) {
        maybeText = insertVariables(maybeText, key, variables[key])
      }
    }

    return maybeText
  }
}

// Inserts variable into text if it has any. Otherwise returns original text
function insertVariables(text: string, variableName: string, variableValue: string): string {
  if (text.search(`\\$\\{${variableName}\\}`) !== -1) {
    const replacedText = text.replace(`\${${variableName}}`, variableValue)
    return insertVariables(replacedText, variableName, variableValue)
  } else {
    return text
  }
}
