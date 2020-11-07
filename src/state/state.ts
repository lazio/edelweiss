import { render } from '../dom/render';
import { _current, _routerGlobalOptions } from '../router/router';

export interface State {
  [key: string]: unknown;
}

export function createState<T extends State = {}>(obj: T): T {
  return new Proxy<T>(obj, {
    set(target, property, value, receiver) {
      /**
       * If value is object with same reference, there is no
       * need to set it to target. Object was updated by
       * reference, so for rerendering page user must assing
       * new object. If value is primitive, there is no
       * need to rerender page as page view will be the same.
       */
      if (Object.is(target[property as string], value)) {
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
          render(
            _current.container || _routerGlobalOptions.container,
            _current.view()
          );
        }

        return isSuccessful;
      }
    },
    deleteProperty(target, property) {
      if (property in target) {
        const isSuccessful = Reflect.deleteProperty(target, property);

        if (isSuccessful) {
          render(
            _current.container || _routerGlobalOptions.container,
            _current.view()
          );
        }

        return isSuccessful;
      } else {
        /**
         * If user is trying delete property that doesn't exists
         * the TypeError must be thrown. It is a convention - delete
         * only existed property.
         */
        return false;
      }
    },
  });
}
