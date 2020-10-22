import { render } from '../dom/render';
import { _current, _routerGlobalOptions } from '../router/router';

type StateValue =
  | State
  | number
  | string
  | boolean
  | Function
  | Array<StateValue>;
export interface State {
  [key: string]: StateValue;
}

export function createState<T extends State = {}>(obj: T): T {
  return new Proxy<T>(obj, {
    set(target, property, value, receiver) {
      const isSuccessful = Reflect.set(target, property, value, receiver);

      if (isSuccessful) {
        render(
          _current.container || _routerGlobalOptions.baseContainer,
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
            _current.container || _routerGlobalOptions.baseContainer,
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
