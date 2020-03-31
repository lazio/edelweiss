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

  declare type ExpectRightChecks = {
    toEqual: (expected: mixed) => void,
    toThrow: (expectedError?: Error) => void,
    toMatch: (expected: string | RegExp) => void,
    toBe: (
      type: 'string'
        | 'number'
        | 'NaN'
        | 'boolean'
        | 'null'
        | 'undefined'
        | 'function'
        | 'PlainObject'
        | 'Set'
        | 'Map'
        | 'RegExp'
        | 'WeakMap'
        | 'WeakSet'
        | 'Promise'
        | 'Array'
    ) => void,
    toBeTruthy: () => void,
  }

  declare type ExpectChecks = {
    ...ExpectRightChecks,
    not: {
      ...ExpectRightChecks,
    },
    toBeResolved: () => Promise<ExpectChecks>,
    toBeRejected: (expectedError?: Error) => Promise<void>,
  }
}
