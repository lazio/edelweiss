import Component from '../component/component';
import { uid } from '../utils/uid';
import { warn } from '../utils/warn';
import { eventListenersMap } from '../dom/events';
import { Hooks, hooksManager } from '../dom/hooks';
import {
  createHookAttributeName,
  createEventIdAttributeName,
} from '../utils/library_attributes';
import { promiseOf, isNothing, maybeOf } from '@fluss/core';
import {
  eventListenerRegExp,
  hookAttributeRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps';

export async function html(
  parts: TemplateStringsArray,
  ...variables: Array<any>
): Promise<string> {
  return parts.reduce((previous, current, index) => {
    return (
      maybeOf(variables[index])
        // Wrap variable into Promise
        .map(promiseOf)
        .map((promiseWithVariable) =>
          // Gets template from Component
          promiseWithVariable.then((variable) => buildMaybeComponent(variable))
        )
        .map((promiseWithVariable) =>
          /**
           * Variable may be an Array that contains string, Promise<string> and Component,
           * so we must wait for resolving it and then return result. We do not handle other
           * objects.
           * Also we prevent from inseting commas into template.
           */
          promiseWithVariable.then((variable) =>
            Array.isArray(variable)
              ? Promise.all(
                  variable.map((maybeComponent) =>
                    buildMaybeComponent(maybeComponent)
                  )
                ).then((all) => all.join(''))
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
  promiseWithVariable: Promise<any>,
  current: string,
  index: number
): Promise<string> {
  const variable = await promiseWithVariable;

  // Handle @event listener if there is any.
  const matchedElementEventListener = eventListenerRegExp.exec(current);
  if (!isNothing(matchedElementEventListener)) {
    let listener = variable;

    if (typeof listener !== 'function' && isNothing(listener.handleEvent)) {
      warn(`Event listener must be type of "function" or object with
  "handleEvent" method, but given "${typeof listener}".`);
      listener = () => {};
    }

    const eventId = uid();
    eventListenersMap.set(eventId, {
      [matchedElementEventListener[1]]: listener,
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
  /** Handle hook attribute. */
  const matchHookAttribute = hookAttributeRegExp.exec(current);
  if (!isNothing(matchHookAttribute)) {
    const dataHookId = uid();
    /**
     * matchHookAttribute can contain only hook keywords, so we can not
     * check its value.
     */
    const hookName = matchHookAttribute[1] as Hooks;

    hooksManager[hookName].set(dataHookId, variable);

    return current.replace(
      hookAttributeRegExp,
      `${createHookAttributeName(hookName)}="${dataHookId}"`
    );
  }

  return current + variable;
}

/** Extract template from `Component`. */
function buildMaybeComponent<T>(variable: T | Component): T | Promise<string> {
  return variable instanceof Component ? variable._createNodes() : variable;
}
