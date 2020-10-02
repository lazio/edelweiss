export function isElementNode(value: Node): value is Element {
  return value.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(value: Node): value is Text {
  return value.nodeType === Node.TEXT_NODE;
}

export function isCommentNode(value: Node): value is Comment {
  return value.nodeType === Node.COMMENT_NODE;
}
