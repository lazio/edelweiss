// @flow

import { isBrowser } from './env.mjs'

type Policy = {
  createHTML: (string) => string
}

if (isBrowser()) {
  // Polyfill for trusted types
  if (typeof window.trustedTypes === 'undefined') {
    window.trustedTypes = {
      createPolicy(
        name: string,
        rules: {| createHTML: (text: string) => string |}
      ) {
        return rules
      },
    }
  }
}

// Policy of "edelweiss" framework for preventing XSS vulnerability.
// More info [here](https://github.com/w3c/webappsec-trusted-types)
export const edelweissPolicy: Policy = isBrowser()
  ? window.trustedTypes.createPolicy('edelweiss', {
    createHTML(text: string) {
      return text
    },
  })
  : {
    createHTML(text: string) {
      return text
    },
  }
