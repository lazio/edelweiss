/**
 * Is a instruction to be accomplished in response
 * of change value of reactive state.
 */
export type Action<A, R> = (value: A) => R;

/** Define binding between reactive property and needed action. */
export class Dependency<V, R> {
  /**
   * Holds reactive's id to distinguish reactives with
   * similar property names.
   */
  readonly _id: string;
  /**
   * Name of the property of state object,
   * change of which will cause invoking _action_ function.
   * **Not for direct use.**
   */
  readonly _property: string;
  /** Dependent from _property_ procedure. **Not for direct use.**  */
  readonly _action: Action<V, R>;
  /**
   * Store most recent result of _action_
   * method.
   * Using this property directly cause loosing
   * reactivity, because only `Dependency` itself
   * is reactive. But in computed context users
   * can freely extract inner value of `Dependency`.
   *
   * Assigning value to this property will not have
   * any effect.
   */
  value: R;

  constructor(
    id: string,
    property: string,
    action: Action<V, R>,
    initialValue: V
  ) {
    this._id = id;
    this._property = property;
    this._action = (value: V): R => (this.value = action(value));
    this.value = action(initialValue);
  }
}

export function isDependency<V, R>(value: unknown): value is Dependency<V, R> {
  return value instanceof Dependency;
}
