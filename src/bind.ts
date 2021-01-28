import { reactive } from './core/reactive';
import { Dependency } from './core/dependency';

/**
 * Creates container for bounded value
 * and mark place in DOM, that need to be
 * updated with bounded value.
 *
 * Can accept _transform_ function that maps
 * bounded value to needed result, that will
 * be used or inserted into DOM.
 * If functions is invoked without argument,
 * then value is returned as is.
 */
export interface ValueContainerFunction<V> {
  (): Dependency<V, V>;
  <R>(transform: (value: V) => R): Dependency<V, R>;
}

/**
 * Updates value of container.
 * Value can be calculated on top of old
 * version. Also function can accept just a
 * new value.
 */
export interface UpdateValueContainerFunction<V> {
  (value: V | ((old: V) => V)): void;
}

/**
 * Create reactive bindings with _value_ and DOM node(s).
 * Allow transform bounded value. If _transform_ function
 * is not provided, then bounded value is returned as is.
 * _update_ function can accept new value or calculate
 * new value based on old one.
 */
export function bind<V>(
  value: V
): readonly [
  container: ValueContainerFunction<V>,
  update: UpdateValueContainerFunction<V>
] {
  const bound = reactive({ value });

  return [
    (fn = (x: V): V => x) => bound.value((value) => fn(value)),
    (argument) => {
      bound.value(
        typeof argument === 'function'
          ? bound.value(argument as (old: V) => V).value
          : argument
      );
    },
  ];
}
