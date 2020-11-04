import { render } from '../dom/render';
import { _current, _routerGlobalOptions } from '../router/router';

export interface State {
  [key: string]: unknown;
}

export function createState<T extends State = {}>(obj: T): T {
  return new Proxy<T>(obj, {
    set(target, property, value, receiver) {
      const isSuccessful = Reflect.set(target, property, value, receiver);

      if (isSuccessful) {
        render(
          _current.container || _routerGlobalOptions.container,
          _current.view()
        );
      }

      return isSuccessful;
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
        return false;
      }
    },
  });
}
