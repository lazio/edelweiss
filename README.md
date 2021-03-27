# Edelweiss

Simply builds UI.

## Intention

This library is not special. It has not smallest runtime size, probably it is not fastest one, but it aims to be the simplest one 🙂.

## Installation

```sh
npm i @prostory/edelweiss
```

For easier creation of `edelweiss` powered apps, use _Edelweiss CLI_. More info about using CLI [here](https://yevhenkap.github.io/docs-cli).

> Documentation for old `1.8.0` version is here 👉 [here](https://yevhenkap.github.io/). But I don't recommend using it, because of greedy DOM diffing algorithm used by first version.

## Getting started

As many other libraries do, Edelweiss lets you define HTML markup in declarative way.

### HTML

The main function exposed by library is **html**. This is tagged template literal function that accepts HTML as string interpolated with static and dynamic parts and returns a `HTMLTemplateElement`.

```ts
const template: HTMLTemplateElement = html`<p>Hello world!</p>`;
```

You need to pass a valid HTML to this function. Though there is a special syntax for handling some cases in declarative way.

#### Event handling

For attaching event listener to element write name of the event prepended by `@` symbol as attribute of element and pass to it value of `EventListenerOrEventListenerObject` type. So simple! 😉

```ts
const template = html`<button
  @click=${(event: MouseEvent) => console.log(event.target)}
>
  Click me!
</button>`;
```

#### Attaching value to element's property

You can attach any value to any element's property. Just write property name prepended by `.` as attribute of element and pass to it desirable value.

```ts
const template = html`<input .hello=${'World!'} />`;
// Then
template.content.querySelector('input').hello; // -> 'World!'
```

#### Handling boolean attributes

For handling presence or absence of attribute prepend it with `?` character and pass to is falsy (attribute will be removed) or truthy (attribute will retain) value.

```ts
const template = html`<input ?readonly=${true} />`; // readonly attribute remains in element.
const template2 = html`<input ?readonly=${false} />`; // readonly attribute will be removed from element.
```

#### Regular attributes

Handling regular attributes does not require special syntax. Just pass value to attribute and all done 😉! Just remember that any value that is not type of `string` will be converted to it. So it is encouraged that you will provide only `string` value to attribute.

```ts
const template = html`<span class="foo ${'baz'}"></span>`;
```

#### Hooks

There is possibility to make some action in responce of element's lifecycle. There is three events:

- `mounted`: element is inserted into DOM.
- `updated`: any part of element is updated.
- `will-unmount`: element will be removed from DOM after this event.

You can attach to them callback, that will be invoked with element on which callback is executed. In order to do that write name of the event prepended by `:` character and pass to it callback function.

```ts
const template = html`<p
  :mounted=${(element: HTMLParagraphElement) => {
    /* Do some action. */
  }}
></p>`;
```

> If callback is asynchronous, then it will not be awaited, so there may be inconsistencies if such hook is attached to `will-unmount` hook, because element can be removed before hook is done executing.

#### Children

As children to other elements are accepted `HTMLTemplateElement`, `string` or `Iterable` of both. All values, except for `HTMLTemplateElement`, will be converted to `string` and passed into HTML as `Text` node. `Iterable` value will be unfoled and its values processed separately.

> This is done intentionally for preventing inserting arbitrary text as HTML.

```ts
const child = html`<p>${'Child'}</p>`;
const parent = html`<div>${child}</div>`; // -> "<div> <p>Child</p> </div>"

const links = [
  html`<a href="/">Home</a>`,
  html`<a href="/about">About<a></a></a>`,
];
const menu = html`<nav>${links}</nav>`; // Links will be inserted into <nav> element.
```

### Custom elements

Library contains `CustomHTMLElement` class for easy creating [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

```ts
class MyCustomElement extends CustomHTMLElement {
  template(): SecureHTMLNode {
    return html`<p>It is custom element</p>`;
  }
}
// then register it
customElements.define('my-custom', MyCustomElement);
```

That's it 👐!

The main method you should provide - `template`. It should return HTML that will be attached to [ShadowDOM (opened)](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

For communicating with outer world you can define reactive properties. This is _camelCase_d representation of declared `observedAttributes` getter.

```ts
class MyCustomElement extends CustomHTMLElement {
  declare dataColor: Property;

  static get observedAttributes() {
    return ['data-color'];
  }

  template(): SecureHTMLNode {
    return html`<p>It is custom element with ${this.dataColor()}</p>`;
  }
}
```

`Property` is function that if called without arguments returns `Depencency` with value of attribute. It can be directly inserted into HTML to create reactive binding with DOM.

Every value hosted by `Property` can by `null` or type of `string`. If in DOM you want to receive another value that is based on attribute's value, then you can pass transforming function to `Property` execution.

```ts
class MyCustomElement extends CustomHTMLElement {
  declare dataColor: Property;

  static get observedAttributes() {
    return ['data-color'];
  }

  template(): SecureHTMLNode {
    return html`<p>
      It is custom element with ${this.dataColor((color) =>
        // In HTML will be inserted either 'error' or 'success' value
        color === 'red' ? 'error' : 'success'
      )}
    </p>`;
  }
}
```

For updating property's value pass it to `Property` execution.

> Note, that value must be type of `null` or `string`, otherwise they will be converted to string automatically, when assigning to attribute.

If you pass `null` to `Property`, then relative attribute will be removed from element.

```ts
class MyCustomElement extends CustomHTMLElement {
  declare dataColor: Property;

  static get observedAttributes() {
    return ['data-color'];
  }

  makeTransparent(): void {
    // data-color arttribute will be removed from element.
    this.dataColor(null);
  }

  setBlueColor(): void {
    // data-color arttribute's value will be 'blue' (if attribute does not exist, then it will be created).
    this.dataColor('blue');
  }

  template(): SecureHTMLNode {
    return html`<p>
      It is custom element with ${this.dataColor((color) =>
        // In HTML will be inserted either 'error' or 'success' value
        color === 'red' ? 'error' : 'success'
      )}
    </p>`;
  }
}
```

Also you can freely override custom element's lifecycle methods:

- `connectedCallback`
- `disconnectedCallback`
- `adoptedCallback`
- `attributeChangedCallback`

While overriding last method always call `super.attributeChangedCallback(name, oldValue, newValue)`, otherwise `Property`'s reactivity will be lost.

> If you want to override `constructor`, then you should also call `super()` at first.

### Render

For inserting generated HTML into DOM, call `render` function. It accepts element from DOM to which HTML should be inserted and `HTMLTemplateElement` as container of HTML.

```ts
const template = html`<p>Hello world!</p>`;

render(document.body, template);
```

You can safely insert HTML to element that already has children - `render` function just appends HTML to container element.

### Bind

Variables that are passed to `html` function can be _static_ and _dynamic_. _Static_ variables are permanently inserted into HTML, _dynamic_ are also inserted into HTML, but they remember its place. And after rendering the page they can change self value (this change will be reflected in DOM).

For creating _dynamic_ value use `bind` function. It accept value to be rendered to DOM and returns tuple of two functions:

- `value getter`
- `value setter`

Getter does not return raw value, but special `Dependency` object, that create binding in DOM. Just think of it as raw value.

> `Dependency` value can be inserted only in **attribute's value** and **children** positions.

Getter can accept _transform_ function that will transform value before passing to the DOM. If no argument is provided - value is inserted as is.

```ts
const [count, updateCount] = bind(0);

const template = html`<p>${count()}</p>`;
const template2 = html`<p>${count((value) => value + 1)}</p>`;
```

Setter reactively updates value in container and DOM. It can accept value of the same type or _mutator_ function if the value should be calculated from old one.

```ts
const [count, updateCount] = bind(0);

const template = html`<p>${count()}</p>`;

updateCount(1);
updateCount((oldValue) => oldValue + 1);
```

> If value passed to setter will be the same as old one, then nothing happend - rerender process will not be triggered.

### Router

For basic routing purposes library exports two functions: `router` and `to`.

```ts
function router(
  ...routes: ReadonlyArray<Route>
): Dependency<string, SecureHTMLNode>;
```

This function accepts routes, where route is plain object of `Route` type, and returns `Dependency` with current page's HTML.

```ts
const template = html`
  <div>${router({ pattern: '/', template: () => html`<p>Home page</p>` })}</div>
`;
```

In the above example page will be lived inside _\<div>_.

```ts
export interface Route {
  /**
   * Used to match against whole URL.
   * Pattern must not start with `^` and end with `$`.
   */
  readonly pattern: string;
  /**
   * Used to mark route to be rendered if _pattern_
   * does not match _path_. If more that one route
   * will have this property set, then first one will
   * be used.
   */
  readonly notFound?: boolean;
  /** @param parameters regexp's capturing groups. */
  template(...parameters: ReadonlyArray<string>): SecureHTMLNode;
}
```

As you can see each route must have `pattern` property which is just string representation of `RegExp`.

> Internally for URL matching such construction is used: `new RegExp(route.pattern)`, so do not forget escape backslashes in _pattern_.

For defining variable parts in URL just embrace them with parenthesis and this variables will be available in `template` function as array.

`template` function returns page's HTML: either result of `html` function or text.

`notFound` property is optional and marks route to be used in place when no route matches URL.

> If there will be no route with this property, then default 404 page will be showed.

For navigating between pages use `to` function:

```ts
function to(path: string): void;
```

It accepts URL of page agains which _pattern_ is matched.

```ts
to('/post/12');
```

### Store

Every application need to handle cache (also known as _data_).

Edelweiss exports `store` function that provides simple cache managment.

```ts
function store<S extends Record<string, unknown>>(value: S): Store<S>;
```

It accepts object whose values are treated as chunks of the cache. To get data from `Store` object call _key_ function that are pointed to needed value.

```ts
// All properties of initial objects will act as functions.
const cache = store({ url: '...' });

// So we can call it and receive stored value.
const url: string = cache.url();
```

For changing value inside store you can call _key_ function and pass to it value as argument.

```ts
// Value inside cache store will be changed.
cache.url('https://new.url');
```

or if you want to create new value based on old one - pass function. It accepts old value of cache chunk and must return new one.

```ts
cache.url((oldUrl) => oldUrl + '?query=true');
```

> It is encourage to return **new** value inside this function. For example, if value is object, do not return same object. Instead create new object and return it. Though there will be no error if you modify old object and return it.

Changing value inside store is reactive. You can subscribe to listen this changes through `subscribe` method of `Store`.

```ts
cache.subscribe('url', (url) => {
  /* Do something */
});
```

First parameter is name of the _key_ function. Second parameter is listener that will be called every time value bound with _key_ function is changed.

`subscribe` method returns function that can detach _listener_.

```ts
const unsubscribe = cache.subscribe('url', (url) => {
  /* Do something */
});

// Somewhere in the code...

unsubscribe(); // You do not listen to _url_ changes.
```

### Internationalization

For support different languages on site, Edelweiss suggests `i18n` module.

To add a new language, call `addTranslation` function. First argument must be a language code and second - plain object whose values is text.

```ts
import { addTranslation } from '@prostory/edelweiss';

// You can call this function as many time as you want to add any number of languages.
addTranslation('en', {
  title: 'Great title',
  article: { subtitle: 'Sub', body: 'Lorem ipsum...' },
});
```

Function `translate` allow to insert into HTML translated text. First parameter is point(**.**)-delimeted keys of translation object that points to the text.

```ts
// It automatically inserts into DOM text in current language. By default it is browser's language.
const template = html`<p>${translate('article.body')}</p>`;
```

You can insert inside text some values. In order to do that in translation object define place for it with pattern: `{variableName}` and pass plain object with key equals to `variableName` and value - whatever you want to insert into text.

```ts
addTranslation('en', { go: 'Go to {place}.' });

const template = html`<p>${translate('go', { place: 'store' })}</p>`; // Will be <p>Go to store.</p>
```

When language of the site need to be changed call `setLanguage` function. It accepts language's code.

```ts
// All text that was returned by `translate` function will be changed according to language code.
setLanguage('en');
```

You can find out current language code with `getCurrentLanguage` function.

```ts
const code = getCurrentLanguage();
```

Also `getSupportedLanguages` returns an array of language codes that was registered with `addTranslation` function.

```ts
const codes = getSupportedLanguages();
```

## Word from author

Have fun!
