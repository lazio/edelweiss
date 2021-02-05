import { uid } from './utilities/uid';
import { bridges } from './bridge';
import { Action, Dependency } from './dependency';

interface ReactiveProperty<V> {
  (value: V): void;
  <R>(value: Action<V, R>): Dependency<V, R>;
}

type Reactive<T extends object> = {
  readonly [P in keyof T]: ReactiveProperty<T[P]>;
};

/**
 * Make object's properties reactively bound to DOM.
 *
 * To setup reactive dependency in DOM, provide function
 * as argument to needed property. In order to emit
 * change - provide a value.
 */
export function reactive<T extends object>(obj: T): Reactive<T> {
  // Store reactive's id to touch only those bridges,
  // that have dependencies from _obj_'s properties.
  const reactiveId = uid();

  return new Proxy<Reactive<T>>((obj as unknown) as Reactive<T>, {
    get(target: Reactive<T>, property: string, receiver: unknown) {
      return <R>(value: Action<T[keyof T], R> | T[keyof T]) => {
        if (property in target) {
          const valueInState: T[keyof T] = Reflect.get(
            target,
            property,
            receiver
          );

          if (typeof value === 'function') {
            return new Dependency<T[keyof T], R>(
              reactiveId,
              property,
              value as Action<T[keyof T], R>,
              valueInState
            );
          } else {
            if (!Object.is(value, valueInState)) {
              Reflect.set(target, property, value, receiver);
              bridges
                .filter(
                  (bridge) =>
                    bridge.dependency._id === reactiveId &&
                    bridge.dependency._property === property
                )
                .forEach((bridge) => bridge.update(value));
            }
          }
        }
      };
    },
  });
}
