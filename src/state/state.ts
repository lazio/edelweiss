import { render } from '../dom/render';
import { current } from '../router/router';

/** Create state based on object initial values. */
export function createState<T extends object = object>(obj: T): T {
  return new Proxy<T>(obj, {
    set(target, property, value, receiver) {
      /**
       * If value is object with same reference, there is no
       * need to set it to target. Object was updated by
       * reference, so for rerendering page user must assing
       * new object. If value is primitive, there is no
       * need to rerender page as page view will be the same.
       */
      if (Object.is(target[property as keyof T], value)) {
        /**
         * If value is the same as in target there is not need to set
         * value to target, but we must return true to
         * signal that "assigning" is performed successfully
         * and TypeError will not be thrown.
         */
        return true;
      } else {
        const isSuccessful = Reflect.set(target, property, value, receiver);

        if (isSuccessful) {
          render(current.container, current.view());
        }

        return isSuccessful;
      }
    },
    deleteProperty(target, property) {
      if (property in target) {
        const isSuccessful = Reflect.deleteProperty(target, property);

        if (isSuccessful) {
          render(current.container, current.view());
        }

        return isSuccessful;
      } else {
        /**
         * If property does not exists in target,
         * simply do nothing. An error will not be
         * thrown (rid of unnecessary check for property
         * existence).
         */
        return true;
      }
    },
  });
}
