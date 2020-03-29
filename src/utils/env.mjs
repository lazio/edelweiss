// @flow

export function isBrowser() {
  return window !== undefined
}

export function isServer() {
  return global !== undefined
}
