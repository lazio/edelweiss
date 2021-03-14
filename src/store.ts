export type Listener<A> = (value: A) => void;
export type Mutator<A> = (old: A) => A;

export interface StoreProperty<V> {
  (): V;
  (value: V | Mutator<V>): void;
}

/** Reactive container of state object. */
export type Store<T extends object> = {
  readonly [P in keyof T]: StoreProperty<T[P]>;
} & {
  /**
   * Attach _listener_ to react on changes of _property_ in store.
   *
   * @returns function that stops _listener_ from observing
   * _property_ changes.
   */
  subscribe<P extends keyof T>(
    property: P,
    listener: Listener<T[P]>
  ): VoidFunction;
};

/**
 * Create reactive store.
 *
 * All properties of initial state (_value_ object) will be
 * transformed into functions with same name.
 * To get value of property, call property function with no argument.
 * To update value of property, either pass new value or function,
 * that accepts old property value and returns new one.
 */
export const store = <S extends Record<string, unknown>>(
  value: S
): Store<S> => {
  const listeners: Map<
    keyof S,
    ReadonlyArray<Listener<S[keyof S]>>
  > = new Map();

  return new Proxy<Store<S>>((value as unknown) as Store<S>, {
    get(target: Store<S>, property: string, receiver: unknown) {
      return (
        argument?: Mutator<S[keyof S]> | S[keyof S] | keyof S,
        listener?: Listener<S[keyof S]>
      ) => {
        if (property in target) {
          if (argument === undefined) {
            return Reflect.get(target, property, receiver);
          } else {
            const oldValue = Reflect.get(target, property, receiver);
            const newValue =
              typeof argument === 'function'
                ? (argument as Mutator<S[keyof S]>)(oldValue)
                : (argument as S[keyof S]);

            if (!Object.is(oldValue, newValue)) {
              Reflect.set(target, property, newValue, receiver);
              (listeners.get(property as keyof S) ?? []).forEach((fn) =>
                fn(newValue)
              );
            }
          }
        } else if (property === 'subscribe') {
          listeners.set(
            argument as keyof S,
            (listeners.get(argument as keyof S) ?? []).concat([
              listener as Listener<S[keyof S]>,
            ])
          );

          return () => {
            listeners.set(
              argument as keyof S,
              (listeners.get(argument as keyof S) ?? []).filter(
                (fn) => fn !== listener
              )
            );
          };
        }
      };
    },
  });
};
