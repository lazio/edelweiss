export function extractParameters(
  path: string,
  templatePath: string
): RegExpMatchArray {
  return path.match(addBoundariesTo(templatePath)) ?? [];
}

/** Test path against defined path regexp. */
export function isMatched(path: string, templatePath: string): boolean {
  return path.search(addBoundariesTo(templatePath)) !== -1;
}

function addBoundariesTo(path: string): string {
  let boundedTemplatePath = path.startsWith('^') ? path : `^${path}`;
  return boundedTemplatePath.endsWith('$')
    ? boundedTemplatePath
    : `${boundedTemplatePath}$`;
}
