// @flow

export function uid(): string {
  return `${window.crypto.getRandomValues(new Uint32Array(1))[0]}`
}
