import { Maybe, maybeOf } from '@fluss/core';

/** Test path against defined path regexp. */
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

  return maybeOf(path.match(boundedTemplatePath));
}
