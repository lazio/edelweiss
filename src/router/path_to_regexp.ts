import { pathVariableRegExp } from '../utils/regexps';
import { Maybe, maybeOf } from '@fluss/core';

/**
 * Test path against defined path template.
 * Variable is created by preceeding colon before paths part name `:name:`.
 * Optional variable is created by appending question mark to it `:name:?`.
 */
export function matchPath(
  path: string,
  templatePath: string
): Maybe<RegExpMatchArray> {
  let boundedTemplatePath = templatePath.startsWith('^')
    ? templatePath
    : `^${templatePath}`;
  boundedTemplatePath = boundedTemplatePath.endsWith('$')
    ? boundedTemplatePath
    : `${boundedTemplatePath}$`;

  return maybeOf(
    path.match(boundedTemplatePath.replace(pathVariableRegExp, '(.+)$1'))
  );
}
