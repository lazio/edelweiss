import { bridges } from './bridge';
import { Dependency } from './dependency';

/**
 * Function that can be passed to `reactive` method,
 * to indicate reactive dependency from value.
 */
export type Action<A, R = unknown> = (value: A) => R;

type Reactive<T extends object> = {
  readonly [P in keyof T]: <V extends Action<T[P]> | T[P]>(
    value: V
  ) => V extends Action<T[P]> ? Dependency<T[P], ReturnType<V>> : void;
};

/**
 * Make object's properties reactively bound to DOM.
 *
 * To setup reactive dependency in DOM provide function
 * as argument to needed property. In order to emit
 * change - provide value.
 */
export function reactive<T extends object>(obj: T): Reactive<T> {
  return new Proxy<Reactive<T>>((obj as unknown) as Reactive<T>, {
    get(target, property, receiver) {
      return (value: Action<T[keyof T]> | T[keyof T]) => {
        if (property in target) {
          const valueInState: T[keyof T] = Reflect.get(
            target,
            property,
            receiver
          );

          if (typeof value === 'function') {
            return new Dependency<T[keyof T]>(
              property as string,
              value as Action<T[keyof T]>,
              valueInState
            );
          } else {
            if (!Object.is(value, valueInState)) {
              Reflect.set(target, property, value, receiver);
              bridges
                .filter((bridge) => bridge.dependency.property === property)
                .forEach((bridge) => bridge.update(value));
            }
          }
        }
      };
    },
  });
}
