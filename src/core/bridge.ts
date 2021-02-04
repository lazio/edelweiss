import { isIterable } from './utilities/is_iterable';
import { adoptToNodes } from './utilities/adopt_to_nodes';
import { callHook, callHookOnElementWithChildren, Hooks } from './hooks';
import type { Dependency } from './dependency';

/**
 * Describe values that can be inserted into template
 * as nodes. `string` value will be converted to `Text`
 * node and `HTMLTemplateElement`'s children will be
 * adopted to outer document.
 */
export type SecureHTMLNode =
  | string
  | HTMLTemplateElement
  | Iterable<string | HTMLTemplateElement>;

/**
 * Base class for binding between DOM nodes
 * and dependencies.
 */
export interface Bridge {
  /** Node that this bridge points to.
   * For attribute bridge that is element that has
   * reactibe attribute.
   * For node bridge that is start comment node.
   */
  readonly node: Node;
  readonly dependency: Dependency<unknown, unknown>;

  update(value: unknown): void;
}

export class RegularAttributeBridge implements Bridge {
  readonly node: Element;
  readonly name: string;
  readonly dependency: Dependency<unknown, string>;

  constructor(
    node: Element,
    name: string,
    dependency: Dependency<unknown, string>
  ) {
    this.node = node;
    this.name = name;
    this.dependency = dependency;
  }

  update(value: unknown): void {
    const attributeValue = this.node.getAttribute(this.name);
    if (attributeValue !== null) {
      const oldValue = String(this.dependency.value);
      const newValue = String(this.dependency.action(value));
      this.node.setAttribute(
        this.name,
        attributeValue.replace(oldValue, newValue)
      );
      callHook(Hooks.UPDATED, this.node);
    }
  }
}

export class ToggleAttributeBridge implements Bridge {
  readonly node: Element;
  readonly name: string;
  readonly dependency: Dependency<unknown, boolean>;

  constructor(
    node: Element,
    name: string,
    dependency: Dependency<unknown, boolean>
  ) {
    this.node = node;
    this.name = name;
    this.dependency = dependency;
  }

  update(value: unknown): void {
    Boolean(this.dependency.action(value))
      ? this.node.setAttribute(this.name, '')
      : this.node.removeAttribute(this.name);
    callHook(Hooks.UPDATED, this.node);
  }
}

export class PropertyBridge implements Bridge {
  readonly node: Element;
  readonly name: string;
  readonly dependency: Dependency<unknown, unknown>;

  constructor(
    node: Element,
    name: string,
    dependency: Dependency<unknown, unknown>
  ) {
    this.node = node;
    this.name = name;
    this.dependency = dependency;
  }

  update(value: unknown): void {
    (this.node as Element & { [property: string]: unknown })[
      this.name
    ] = this.dependency.action(value);
    callHook(Hooks.UPDATED, this.node);
  }
}

export class NodeBridge implements Bridge {
  constructor(
    readonly node: Comment,
    readonly dependency: Dependency<unknown, SecureHTMLNode>,
    readonly endNode: Comment
  ) {}

  update(value: unknown): void {
    const changedValue = this.dependency.action(value);
    const nodes = isIterable(changedValue)
      ? Array.from(changedValue)
          .map(adoptToNodes)
          .reduce((all, current) => all.concat(current), [])
      : adoptToNodes(changedValue);

    while (
      this.node.nextSibling !== null &&
      this.node.nextSibling !== this.endNode
    ) {
      // Cleanup bridges that are pointed to node that will
      // be removed.
      removeBridgeConnectedTo(this.node.nextSibling);
      callHookOnElementWithChildren(
        Hooks['WILL_UNMOUNT'],
        this.node.nextSibling
      );
      this.node.nextSibling.remove();
    }

    this.node.after(...nodes);
    nodes.forEach((node) => callHookOnElementWithChildren(Hooks.MOUNTED, node));
  }
}

export let bridges: Array<Bridge> = [];

function removeBridgeConnectedTo(node: Node): void {
  bridges = bridges.filter((bridge) => !bridge.node.isSameNode(node));
}
