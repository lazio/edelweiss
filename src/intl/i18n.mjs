// @flow

import type Router from '../router/router.mjs'

export type I18nValue = {
  [string]: string | { [string]: I18nValue }
}

export type I18nOptions = {
  [string]: I18nValue
}

export default class I18n {
  +_languages: I18nOptions
  _currentLanguageFile: I18nValue
  +_router: Router
  currentLanguage: string

  constructor(options: I18nOptions, router: Router, current?: string) {
    this._languages = options
    this._router = router

    const tmp = Object.entries(this._languages)
    this.currentLanguage = current || tmp[0][0]
    this._currentLanguageFile = this._languages[this.currentLanguage]
  }

  setLanguage(tag: string) {
    const translation = this._languages[tag]

    if (!translation) {
      console.error(`You do not have translation for ${tag} language!`)
    } else {
      this.currentLanguage = tag
      this._currentLanguageFile = translation
      this._router.reload()
    }
  }

  translate(path: string): string {
    const splitted = path.split('.')
    let maybeText = this._currentLanguageFile

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

    return maybeText
  }
}
