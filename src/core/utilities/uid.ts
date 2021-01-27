/** Generates unique id. */
export function uid(): number {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}
