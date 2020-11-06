import { uid } from '../utils/uid';
import { warn } from '../utils/warn';
import { eventListenersMap } from '../dom/events';
import { Hooks, hooksManager } from '../dom/hooks';
import {
  SpecialAttributes,
  ValueableHTMLElement,
} from '../dom/special_attributes';
import {
  createHookAttributeName,
  createEventIdAttributeName,
} from '../utils/library_attributes';
import { promiseOf, isNothing, maybeOf } from '@fluss/core';
import {
  valueRegExp,
  eventListenerRegExp,
  hookAttributeRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps';
import type { HookCallback } from '../dom/hooks';

type TemplateVariable =
  | null
  | undefined
  | string
  | number
  | boolean
  | Promise<string>
  // EventListener or HooksCallback
  | Function
  | EventListenerObject;

export async function html(
  parts: TemplateStringsArray,
  ...variables: Array<TemplateVariable | Array<TemplateVariable>>
): Promise<string> {
  return parts.reduce((previous, current, index) => {
    return (
      maybeOf(variables[index])
        // Wrap variable into Promise
        .map(promiseOf)
        .map((promiseWithVariable) =>
          /**
           * TemplateVariable may be an Array that contains string, Promise<string>,
           * so we must wait for resolving it and then return result.
           * We do not handle other objects.
           * Also we prevent from inseting commas into template.
           */
          promiseWithVariable.then((variable) =>
            Array.isArray(variable)
              ? Promise.all(variable).then((all) => all.join(''))
              : variable
          )
        )
        .map((promiseWithVariable) =>
          // Consume current part with previous part
          previous.then((textHTML) =>
            formCurrentHTML(promiseWithVariable, current, index).then(
              (currentHTML) => textHTML + currentHTML
            )
          )
        )
        .extract() || previous.then((prevHtml) => prevHtml + current)
    );
  }, promiseOf(''));
}

async function formCurrentHTML(
  promiseWithVariable: Promise<Exclude<TemplateVariable, Promise<string>>>,
  current: string,
  index: number
): Promise<string> {
  // Need to assign proper value in value handling block.
  let variable = await promiseWithVariable;

  // Handle @event listener if there is any.
  const matchedElementEventListener = eventListenerRegExp.exec(current);
  if (!isNothing(matchedElementEventListener)) {
    let listener = variable;

    if (
      isNothing(listener) ||
      (typeof listener !== 'function' &&
        typeof listener === 'object' &&
        isNothing(listener.handleEvent))
    ) {
      warn(`Event listener must be type of "function" or object with
  "handleEvent" method, but given "${typeof listener}".`);
      listener = () => {};
    }

    const eventId = uid();
    eventListenersMap.set(eventId, {
      // It is up to user to set proper type of function as variable.
      [matchedElementEventListener[1]]: listener as EventListenerOrEventListenerObject,
    });

    return current.replace(
      matchedElementEventListener[0],
      `${createEventIdAttributeName(index)}="${eventId}"`
    );
  }
  // Handle ?attribute
  const matchBooleanAttribute = booleanAttributeRegExp.exec(current);
  if (!isNothing(matchBooleanAttribute)) {
    /**
     * It accepts all values and check if it is falsy or truthy.
     * There are 7 falsy values in JS: [values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
     */
    return current.replace(
      matchBooleanAttribute[0],
      variable ? matchBooleanAttribute[1] : ''
    );
  }

  /** Handle special attribute. */
  const matchSpecialAttribute = valueRegExp.exec(current);
  if (!isNothing(matchSpecialAttribute)) {
    let stateGetter = variable;
    const attributeName = matchSpecialAttribute[1] as SpecialAttributes;

    if (
      typeof stateGetter !== 'function' &&
      typeof stateGetter !== 'string' &&
      typeof stateGetter !== 'number'
    ) {
      warn(`Value of "${attributeName}" attribute must have "string", "number" or "function" type,
      but given "${typeof stateGetter}".`);
      stateGetter = '';
    }

    const attributeValue: string =
      typeof stateGetter === 'function' ? stateGetter() : `${stateGetter}`;

    // We doesn't return value, because updated hook need to be handled.
    current = current.replace(
      valueRegExp,
      `${attributeName}="${attributeValue}" :${Hooks.Updated}=`
    );

    // Assign updating function to variable.
    variable = (element: ValueableHTMLElement) => {
      element.setAttribute(attributeName, attributeValue);
      element[attributeName] = attributeValue;
    };
  }

  /** Handle hook attribute. */
  const matchHookAttribute = hookAttributeRegExp.exec(current);
  if (!isNothing(matchHookAttribute)) {
    let hookCallback = variable;

    if (typeof hookCallback !== 'function') {
      warn(
        `Event listener must be type of "function", but given "${typeof hookCallback}".`
      );
      hookCallback = () => {};
    }

    const dataHookId = uid();
    /**
     * matchHookAttribute can contain only hook keywords, so we can not
     * check its value.
     */
    const hookName = matchHookAttribute[1] as Hooks;

    // It is up to user to set proper type of function as variable.
    hooksManager[hookName].set(dataHookId, hookCallback as HookCallback);

    return current.replace(
      hookAttributeRegExp,
      `${createHookAttributeName(hookName, index)}="${dataHookId}"`
    );
  }

  return current + variable;
}
