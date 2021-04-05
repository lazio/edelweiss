type Policy = {
  createHTML: (text: string) => string;
};

declare namespace globalThis {
  var trustedTypes: {
    createPolicy: (name: string, rules: Policy) => Policy;
  };
}

// Polyfill for trusted types
if (typeof globalThis.trustedTypes === 'undefined') {
  globalThis.trustedTypes = {
    createPolicy(name: string, rules: Policy) {
      return rules;
    },
  };
}

// Policy of "edelweiss" framework for preventing XSS vulnerability.
// More info [here](https://github.com/w3c/webappsec-trusted-types)
export const edelweissPolicy: Policy = globalThis.trustedTypes.createPolicy(
  'edelweiss',
  {
    createHTML(text: string) {
      return text;
    },
  }
);
