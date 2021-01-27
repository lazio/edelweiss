import { reactive } from './core/reactive';
import { Dependency } from './core/dependency';

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
  value: <R>(transform?: (value: V) => R) => Dependency<V, R>,
  update: (argument: V | ((old: V) => V)) => void
] {
  const bound = reactive({ value });

  return [
    (fn = <R>(x: V): R => (x as unknown) as R) =>
      bound.value((value: V) => fn(value)),
    (argument) =>
      bound.value(
        typeof argument === 'function'
          ? bound.value(argument as (old: V) => V).value
          : argument
      ),
  ];
}
