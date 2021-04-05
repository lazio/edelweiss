import { isObject } from './utilities/checks';

/**
 * Is a instruction to be accomplished in response
 * of change value of reactive state.
 */
export type Action<A, R> = (value: A) => R;

/** Define binding between reactive property and needed action. */
export interface Dependency<V, R> {
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
  readonly value: R;
  /** Tells that this object is type of `Dependency`. */
  readonly _isDependency: boolean;
  /**
   * Tells if _id_ and _property_ belongs to this
   * `Dependency`.
   */
  _owns: (id: string, property: string) => boolean;
  /**
   * Dependency action between property's value and
   * value in DOM.
   */
  _handle: (value: V) => R;
}

/** Initializes `Dependency`. */
export const createDependency = <V, R>(
  /**
   * Holds reactive's id to distinguish reactives with
   * similar property names.
   */
  id: string,
  /**
   * Name of the state's property,
   * change of which will cause invoking _action_ function.
   */
  property: string,
  /** Dependent from _property_ procedure.  */
  action: Action<V, R>,
  initialValue: V
) => {
  let _value = action(initialValue);

  return {
    _owns: (dependencyId: string, dependencyPropertyName: string) =>
      id === dependencyId && property === dependencyPropertyName,
    _handle: (value: V) => (_value = action(value)),
    get value(): R {
      return _value;
    },
    get _isDependency(): boolean {
      return true;
    },
  };
};

export const isDependency = <V, R>(value: unknown): value is Dependency<V, R> =>
  isObject(value) && (value as Dependency<V, R>)._isDependency;
