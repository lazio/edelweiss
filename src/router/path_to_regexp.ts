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
  return maybeOf(
    path.match(`^${templatePath}$`.replace(pathVariableRegExp, '(.+)$1'))
  );
}
