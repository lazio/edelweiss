// @flow

export function diff(oldNode: HTMLElement, newNode: HTMLElement) {
  if (oldNode.nodeType === newNode.nodeType) {
    if (oldNode.tagName === newNode.tagName) {
      diffAttributes(oldNode, newNode)

      if (newNode.hasChildNodes()) {
        if (newNode.children.length > 0) {
          const oChildren = Array.from(oldNode.children)
          const nChildren = Array.from(newNode.children)

          for (let i = 0; i < Math.max(oChildren.length, nChildren.length); i++) {
            const oNode = oChildren[i]
            const nNode = nChildren[i]

            if (oNode) {
              if (nNode) {
                diff(oNode, nNode)
              } else {
                oNode.remove()
              }
            } else if (nNode) {
              oldNode.append(nNode)
            }
          }
        } else if (newNode.textContent) {
          oldNode.textContent = newNode.textContent
        } else {
          oldNode.innerHTML = '' // Script will probably never be here
        }
      } else {
        oldNode.replaceWith(newNode)
      }
    } else {
      oldNode.replaceWith(newNode)
    }
  } else {
    oldNode.replaceWith(newNode)
  }
}

function diffAttributes(oldNode: HTMLElement, newNode: HTMLElement) {
  if (oldNode.attributes.length !== newNode.attributes.length) {
    // Remove exessive attributes
    Array.prototype.forEach.call(
      oldNode.attributes,
      ({ name }) => {
        if (!newNode.hasAttribute(name)) {
          oldNode.removeAttribute(name)
        }
      }
    )
  }

  // Add missing attributes and update changed
  Array.prototype.forEach.call(
    newNode.attributes,
    ({ name, value }) => {
      oldNode.setAttribute(name, value)
    }
  )
}
