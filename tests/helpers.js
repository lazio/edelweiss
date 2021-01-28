export function stripComments(text) {
  return text.replace(/<!--[^(<!--)]+-->/g, '');
}
