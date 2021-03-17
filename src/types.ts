/**
 * Function that must create new value
 * from old one and with the same type.
 */
export interface Mutator<A> {
  (old: A): A;
}

/**
 * Function that must transform value of
 * one type to value of another type.
 */
export interface Transformer<V, R> {
  (value: V): R;
}

/**
 * Function that does some action with
 * emitted value.
 */
export interface Listener<A> {
  (value: A): void;
}
