export function adoptToNodes(value: unknown): ReadonlyArray<ChildNode> {
  return value instanceof HTMLTemplateElement
    ? [...document.adoptNode(value.content).childNodes]
    : // Users can provide value of type other than `string`.
      // In that case value must be explicitly converted to `string`.
      [document.createTextNode(String(value))];
}
