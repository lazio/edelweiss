window.crypto = {
  getRandomValues(array) {
    // We do not need to polyfill window.crypto,
    // so we just return array with one number.
    return array.map(() => Math.ceil(Math.random() * 100) << 1);
  },
};
