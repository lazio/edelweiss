import Router from '../router/router';

type StateValue = string | number | boolean | Array<StateValue> | State;
export interface State {
  [key: string]: StateValue;
}

export function createState<T extends State = {}>(obj: T): T {
  return new Proxy<T>(obj, {
    set(target, property, value, receiver) {
      const isSuccessful = Reflect.set(target, property, value, receiver);

      if (isSuccessful) {
        Router.reload();
      }

      return isSuccessful;
    },
    deleteProperty(target, property) {
      if (property in target) {
        const isSuccessful = Reflect.deleteProperty(target, property);

        if (isSuccessful) {
          Router.reload();
        }

        return isSuccessful;
      } else {
        return false;
      }
    },
  });
}
