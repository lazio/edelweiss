import crypto from 'crypto';

window.crypto = {
  getRandomValues(arr) {
    // We do not need to polyfill window.crypto, so we just return array with one number.
    return [crypto.randomBytes(arr.length).length];
  },
};
