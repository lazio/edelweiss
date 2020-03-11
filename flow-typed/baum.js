// @flow

declare module '/node_modules/@prostory/baum/dist/index.mjs' {
  declare export class BaumError extends Error {
    constructor(message: string, error?: Error): BaumError;

    toString(): string;
  }

  declare export function group(title: string, fn: () => void): void

  declare export function test(
    title: string,
    fn: () => Promise<void> | void
  ): void

  declare export function expect(given: mixed): ExpectChecks

  declare type ExpectChecks = {
    toEqual: (expected: mixed) => void,
    toNotEqual: (expected: mixed) => void,
    toThrow: (expectedError?: Error) => void,
    toNotThrow: () => void,
    toMatch: (expected: string | RegExp) => void,
    toNotMatch: (expected: string | RegExp) => void,
    isNumber: () => void,
    isNotNumber: () => void,
    isString: () => void,
    isNotString: () => void,
    isNaN: () => void,
    isNotNaN: () => void,
    isBoolean: () => void,
    isNotBoolean: () => void,
    isArray: () => void,
    isNotArray: () => void,
    isSet: () => void,
    isNotSet: () => void,
    isWeakSet: () => void,
    isNotWeakSet: () => void,
    isMap: () => void,
    isNotMap: () => void,
    isWeakMap: () => void,
    isNotWeakMap: () => void,
    isNull: () => void,
    isNotNull: () => void,
    isUndefined: () => void,
    isNotUndefined: () => void,
    isFunction: () => void,
    isNotFunction: () => void,
    isPromise: () => void,
    isNotPromise: () => void,
    isPlainObject: () => void,
    isNotPlainObject: () => void,
    toBeResolved: () => Promise<ExpectChecks>,
    toBeRejected: (expectedError?: Error) => Promise<void>,
  }
}