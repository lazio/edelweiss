import { uid } from '../utils/uid';
import { hooksManager } from '../dom/hooks';
import { eventListenersMap } from '../dom/events';
import {
  Hooks,
  createHookAttributeName,
  createEventIdAttributeName,
} from '../utils/library_attributes';
import {
  eventListenerRegExp,
  hookAttributeRegExp,
  booleanAttributeRegExp,
  specialPropertiesRegExp,
} from '../utils/regexps';
import type { HookCallback } from '../dom/hooks';

type AllowedValues =
  | null
  | undefined
  | string
  | number
  | boolean
  // EventListener, HookCallback or () => string | number
  | Function
  | Iterable<string>
  | EventListenerObject;

/** Creates string template that will be evaluated as DOM elements. */
export function html(
  parts: TemplateStringsArray,
  ...variables: ReadonlyArray<AllowedValues>
): string {
  return parts.reduce((previous, current, index) => {
    const variable = variables[index];

    if (variable !== null && variable !== undefined) {
      // @ts-issue - TypeScript cannot infer that variable
      // is type of Iterable :(
      const variableWithoutIterable =
        typeof variable === 'object' && Symbol.iterator in variable
          ? Array.from(variable as Iterable<string>).join('')
          : (variable as Exclude<typeof variable, Iterable<string>>);

      // Consume current part with previous part
      return (
        previous + formCurrentHTML(variableWithoutIterable, current, index)
      );
    } else {
      // End of template
      return previous + current;
    }
  }, '');
}

function formCurrentHTML(
  variable: string | number | boolean | Function | EventListenerObject,
  current: string,
  index: number
): string {
  // Handle @event listener if there is any.
  const matchedElementEventListener = eventListenerRegExp.exec(current);
  if (matchedElementEventListener !== null) {
    return handleEventListener(
      matchedElementEventListener[0],
      matchedElementEventListener[1],
      current,
      variable,
      index
    );
  }

  // Handle ?attribute
  const matchBooleanAttribute = booleanAttributeRegExp.exec(current);
  if (matchBooleanAttribute !== null) {
    return handleBoolean(
      matchBooleanAttribute[0],
      matchBooleanAttribute[1],
      current,
      variable
    );
  }

  /** Handle special property and attribute. */
  const matchSpecialProperty = specialPropertiesRegExp.exec(current);
  if (matchSpecialProperty !== null) {
    const [editedCurrent, editedVariable] = handleProperty(
      matchSpecialProperty[1],
      current,
      variable
    );
    current = editedCurrent;
    variable = editedVariable;
  }

  /** Handle hook attribute. */
  const matchHookAttribute = hookAttributeRegExp.exec(current);
  if (matchHookAttribute !== null) {
    /**
     * matchHookAttribute can contain only hook keywords, so we can not
     * check its value.
     */
    return handleHook(matchHookAttribute[1] as Hooks, current, variable, index);
  }

  return current + variable;
}

function handleEventListener(
  fullCustomEventAttribute: string,
  eventName: string,
  current: string,
  variable: Exclude<AllowedValues, null | undefined | ReadonlyArray<string>>,
  index: number
): string {
  let listener = variable;

  if (
    typeof listener !== 'function' &&
    typeof listener === 'object' &&
    !('handleEvent' in listener)
  ) {
    console.warn(`Event listener must be type of "function" or object with
  "handleEvent" method, but given "${typeof listener}".`);
    listener = () => {};
  }

  const eventId = uid();
  eventListenersMap.set(
    eventId,
    // It is up to user to set proper type of function as variable.
    [eventName, listener as EventListenerOrEventListenerObject]
  );

  return current.replace(
    fullCustomEventAttribute,
    `${createEventIdAttributeName(index)}="${eventId}"`
  );
}

function handleBoolean(
  fullBooleanAttribute: string,
  attributeName: string,
  current: string,
  variable: Exclude<AllowedValues, null | undefined | ReadonlyArray<string>>
): string {
  /**
   * It accepts all values and check if it is falsy or truthy.
   * There are 7 falsy values in JS: [values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
   */
  return current.replace(fullBooleanAttribute, variable ? attributeName : '');
}

function handleProperty(
  propertyName: string,
  current: string,
  variable: Exclude<AllowedValues, null | undefined | ReadonlyArray<string>>
): [current: string, variable: Function] {
  let stateGetter = variable;

  if (
    typeof stateGetter !== 'function' &&
    typeof stateGetter !== 'string' &&
    typeof stateGetter !== 'number'
  ) {
    console.warn(`Value of "${propertyName}" property and attribute must have "string", "number" or "function" type,
      but given "${typeof stateGetter}".`);
    stateGetter = '';
  }

  const propertyValue: string =
    typeof stateGetter === 'function' ? stateGetter() : `${stateGetter}`;

  // We doesn't return value, because updated hook need to be handled.
  current = current.replace(
    specialPropertiesRegExp,
    // Attribute is defined here, so we don't need to call
    // setAttribute method.
    `${propertyName}="${propertyValue}" :${Hooks.Updated}=`
  );

  // Assign updating function to variable.
  variable = (element: HTMLElement & { [key: string]: string }) => {
    element[propertyName] = propertyValue;
  };

  return [current, variable];
}

function handleHook(
  hookName: Hooks,
  current: string,
  variable: Exclude<AllowedValues, null | undefined | ReadonlyArray<string>>,
  index: number
): string {
  let hookCallback = variable;

  if (typeof hookCallback !== 'function') {
    console.warn(
      `Event listener must be type of "function", but given "${typeof hookCallback}".`
    );
    hookCallback = () => {};
  }

  const dataHookId = uid();

  // It is up to user to set proper type of function as variable.
  hooksManager[hookName].set(dataHookId, hookCallback as HookCallback);

  return current.replace(
    hookAttributeRegExp,
    `${createHookAttributeName(hookName, index)}="${dataHookId}"`
  );
}
