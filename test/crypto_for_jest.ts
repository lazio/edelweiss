import crypto from 'crypto';

// @ts-ignore - add crypto to jsdom's window object.
window.crypto = {
  getRandomValues(arr: Array<number>) {
    // We do not need to polyfill window.crypto, so we just return array with one number.
    return [crypto.randomBytes(arr.length).length];
  },
};
