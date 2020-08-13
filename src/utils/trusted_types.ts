type Policy = {
  createHTML: (text: string) => string;
};

declare namespace window {
  var trustedTypes: {
    createPolicy: (name: string, rules: Policy) => Policy;
  };
}

// Polyfill for trusted types
if (typeof window.trustedTypes === 'undefined') {
  window.trustedTypes = {
    createPolicy(name: string, rules: Policy) {
      return rules;
    },
  };
}

// Policy of "edelweiss" framework for preventing XSS vulnerability.
// More info [here](https://github.com/w3c/webappsec-trusted-types)
export const edelweissPolicy: Policy = window.trustedTypes.createPolicy(
  'edelweiss',
  {
    createHTML(text: string) {
      return text;
    },
  }
);
