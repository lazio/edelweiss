/** Generates unique id. */
export function uid(): string {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}
