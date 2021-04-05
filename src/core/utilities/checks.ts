export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === 'object';

export const isIterable = <T>(value: unknown): value is Iterable<T> =>
  isObject(value) && Symbol.iterator in value;
