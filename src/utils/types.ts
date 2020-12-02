/**
 * Creates object based on original with provided property names
 * as partial.
 */
export type SomePartial<T, P extends keyof T = keyof T> = Required<Omit<T, P>> &
  Partial<Pick<T, P>>;