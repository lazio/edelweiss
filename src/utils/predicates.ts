export function isElement(value: Node): value is Element {
  return value.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(value: Node): value is Text {
  return value.nodeType === Node.TEXT_NODE;
}
