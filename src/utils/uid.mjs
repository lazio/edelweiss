// @flow

import { isBrowser } from './env.mjs'

export function uid(): string {
  if (isBrowser()) {
    return `${window.crypto.getRandomValues(new Uint32Array(1))[0]}`
  } else {
    return global.crypto.randomBytes(32).toString('hex')
  }
}
