# Edelweiss

**This is web framework that can be used with ES modules or with CommonJS.**

ES modules are supported by almost all modern browser from 2017-2018 year.

`Edge`: from `16` version and `79` (Chromium).

`Firefox`: from `60`.

`Chrome`: from `61`.

`Safari`: from `11`.

`Opera`: from `48`.

[More info at caniuse.](https://caniuse.com/#search=es%20modules)

## Installation

```sh
npm i @prostory/edelweiss
```

For easier creation of `edelweiss` powered apps, use _Edelweiss CLI_. More info about using CLI [here](https://github.com/YevhenKap/edelweiss-cli).

## Dig in

Importing from framework:

```javascript
// ES modules
import { Router } from '/path/to/@prostory/edelweiss/index.mjs';

//or

// CommonJS
const { Router } = require('@prostory/edelweiss');
```

> Note that in current time you cannot import any package like you do with `require()` in ES module system. You must provide absolute path from root of your project (site's root). It can be fixed by [import maps](https://github.com/WICG/import-maps), but it is not standard yet. Also only **.mjs** files can be imported. (See [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/))

In current stage it works only in browser, but not on server (SSR is not designed yet).
This small framework work with browser's DOM as close as possible.

### Template

Templates are writed as html in template literals (similar to **JSX**) using `html`
function (exported from framework).

```typescript
const paragraph: Promise<string> = html`<p>Hello world!</p>`;
```

You should pass valid HTML to `html`. But for convenience there is special syntax for
event listeners, boolean attributes and for defining custom elements.

1. In order to attach event listener to element you can define `@eventName` attribute
   to element. Note **@** followed by `eventName`(_click_, _input_, _change_ etc.). The value of the attribute must be function, that accepts native _event_ object, or object with `handleEvent(event)` method. Otherwise an error will be thrown.

> Note that if you call _this_ inside such function, in production you can receive `undefined` behavior [more detailed here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

```typescript
function handleClick(event: MouseEvent) {
  console.log('Clicked!');
}
const button: Promise<string> = html`
  <button @click=${handleClick}>Click me</button>
`;
```

2. For defining attributes that do not have special values (truthy or falsy attributes:
   `required`, `disabled`, `controls` etc.), you can append **?** to name of that attribute
   and give him _true_ of _false_ value.

> Actually that attribute can accept not only boolean values, but all truthy and falsy values. Though `boolean` is recommended.

```typescript
function mustBeButtonDisabled() {
  // some calculation here
  return false;
}
const button: Promise<string> = html`
  <button class="disabled" ?disabled=${mustBeButtonDisabled()}>Click me</button>
`;

const nextButton: Promise<string> = html`
  <button class="disabled" ?disabled=${false}>Click me</button>
`;

// You can define it as regular attribute.
const thirdButton: Promise<string> = html`
  <button class="disabled" disabled>Click me</button>
`;
```

Regular attributes can be defined as all above. They do not need special syntax.
But all inserted values must be type of `string` or coerce to it.
Also you can omit `"` and `'` around attribute value (not recommended).

```typescript
const button: Promise<string> = html`
  <button class="${isDisabled ? 'disabled' : ''}" disabled>Click me</button>
  <!-- or -->
  <button class=${isDisabled ? 'disabled' : ''} disabled>Click me</button>
`;
```

As children of the elements you pass values of types:

- `string`
- `Component`
- array of them

```typescript
function spans(): Array<Promise<string>> {
  return strings.map((str) => html`<span>${str}</span>`);
}

const template: Promise<string> = html`
  ${new MyComponent()}
  <!-- Note we do not await for Component -->
  <button class="disabled" ?disabled=${mustBeButtonDisabled()}>
    ${spans()}
    <!-- Note we do not await for Array<Promise<string>> -->
  </button>
`;
```

As you can see `html()` funtion returns _Promise_, but you should not handle returning value itself. `html()` handles it for you. Think of it like function returns `string`.

#### Custom elements

For defining custom elements you may write it as regular tags, but with some rules (`element definition`):

1. After tag you type "**=**" sign followed by element constructor (**No `"` or `'` symbols!**).
2. If custom element extend some included element (e.g. `HTMLDivElement`), after tag name you may define `extend` clause by adding double colon ("**:**") and name of the extended tag, otherwise omit it.

> Name of the tag of custom element must be in **kebab-case**. [Name must contain dash.](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name)

> [Detailed about custom elements here.](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

```typescript
// With extending built-in element
class MyP extends HTMLParagraphElement {}

// name-of-the-custom-tag:name-of-the-extended-tag=${constructor}
const text = html`<long-list:p=${MyP}></long-list>`; // Note that after "=" does not follow " or ' and after constructor.

// Without extending built-in element
class SomeElement extends HTMLElement {}

// name-of-the-custom-tag=${constructor}
const text = html`<long-list =${SomeElement}></long-list>`; // Note that after "=" does not follow " or ' and after constructor.
```

Write `element definition` rule only once for certain custom element and on next using write as regular HTML element.
Element definition `can be` or `can not be` in first using of custom element. But it **should be in template**, which has first using of certain _custom element_.

```typescript
// This template first use <custom-p> custom element.
// Element definition contains second occurrence of <custom-p>
html`
  <custom-p class="custom-p">Hello</custom-p>
  <custom-p:p=${class extends HTMLParagraphElement {}}>I am custom element</custom-p>
  <custom-p class="custom-p">I am next custom element</custom-p>
  <custom-p class="custom-p">I am last custom element in this template</custom-p>
`;
```

### Component

If you create template that can be used in two or more places of your site you can group it in plain function that will returns them or define _Component_.

It can be achieved by creating class that extends `Component` class. You must override `template()` method that returns value of type `Promise<string>`.
Also you can override `async beforeBuild()` method that invokes before `async template()` method and `async afterBuild()` that invokes after `async template()`. You can use them for getting data for your view or other tasks that need to be finished before or after building template.
All methods is asyncrounous so you can accomplish asyncrounous operation (like `fetch`ing for some data) in rendering order without creating additional asyncrounous functions.

> Note that while `beforeBuild()` and `afterBuild()` methods are executing when template is not inserted into DOM, so you can't access elements that `template()` method returns.

```typescript
class MyComponent extends Component {
  async beforeBuild() {
    // Some useful work
  }

  async template() {
    return html`<p>Hello</p>`;
  }

  async afterBuild() {
    // Some useful work
  }
}
```

For binding styles to concrete `Component` (they will be loaded to page right before first `Component` rendering) define `styles` method and return css file name or array of css file names from it.

```typescript
class MyComponent extends Component {
  styles() {
    return 'my_component.css'; // or array of stylesheets
  }

  template() {
    return html`<p>Hello</p>`;
  }
}
```

### Styles

Styles can be loaded _immediately_ and _lazingly_.

Global stylesheets should be connected directly to `index.html`.

For lazily loading stylesheets into the page, you must register it at first. Use `registerCss(name: string | Array<string>): void` function.
By default such stylesheets must be set to _/public/styles_ directory. You can change directory - [see `Config`](#Config).

```typescript
registerCss('header'); // Note that you may not provide extension
// or
registerCss('main.css');
```

> This function is not load stylesheet immediately, but register is to be loaded on next rendering step (any of the page that you defined).

> If you use [edelweiss-cli](https://github.com/YevhenKap/edelweiss-cli) for bootstrapping app, you can also import css and images directly in js. Same as in `React`. Note that such css and images will be loaded to page _immediately_ on first rendering.

### Router

It is used for navigating through site and rendering. It interacts with browser's _History_ API and, based on path of the page, renders needed nodes. `Router` has only static methods and static fields.

```typescript
import { Router } from '/path/to/@prostory/edelweiss/index.mjs';
// Navigates to root page.
Router.to('/');

// It will navigate to page based on path in address bar. Reloading window in browser will not
// return to home page but stay in current page.
// It need to be put in script that is directly defined in HTML.
Router.to(window.location.pathname);
```

You must set up `Router` with routes. Route is a plain object:

```typescript
type Route = {
  path: string | RegExp;
  container?: string;
  before?: () => Promise<void>;
  view: () =>
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>;
  after?: () => Promise<void>;
};
```

1. `path` - path of the page that will be visible in browser's search box. If you defines path as `RegExp` always insert start (**^**) and end (**\$**) symbols. If path will be type of _string_ you can not do this.
2. `container` - selector of element which nodes will be replaced. You can not provide it. In this case you must define global `Route.container`.
3. `view` - function that returns nodes that need to be rendered.
4. `before` - hook that invokes before rendering route in which hook is defined. If exists, invokes on every moving to this route. Does not invokes on reloading page.
5. `after` - hook that invokes after rendering route is finished in which hook is defined. If exists, invokes on every moving to this route. Does not invokes on reloading page.

> Does not set changes to state in route hooks. This may lead to infinite rendering route.

```typescript
Router.add([
  {
    path: '/',
    container: '.body',
    view() {
      // We will think that HomePage is the component
      return new HomePage({
        // Custom component may accept some properties
      });
    },
  },
  // Many others routes
]);
```

`Router` have five static methods:

1. `to(path: string, options?: { willStateChange?: boolean }): Promise<void>` - Renders needed page. In some rare situations **window.history** does not need to be updated. In such cases provide object with `willStateChange` property setted to `false` as second parameter.
2. `reload(): Promise<void>` - Reloads current page.
3. `back(): void` - return to previous page.
4. `forward(): void` - forwards to next page if it is in history.
5. `add(routes: Route | Route[]): void` - add routes to `Router`. May be called many times.

Also it has static getter `current` that returns information about current route (it returns all fields from `Route` object and field `parameters` that contains matched path variables, if they was defined in `Route.path`).

In order to define path variable, you must define _path_ in `Route` object as `RegExp` and needed part of path enclose in brackets:

```typescript
const path: Route = {
  path: /^\/root(\/[\w]+)$/,
  container: '.page',
  view() {
    return html`<p>Hello</p>`;
  },
};
```

Then you can get value of captured group (path variable) in `Route.current.parameters`.

```typescript
// Example: path === "/root/asdf"
Router.current.parameters; // Will be ["/root/asdf", "/asdf"]
```

> Actually **parameters** is result of `RegExp.exec` method, so variables will start from index _1_. And index _0_ is path itself. [RegExp.exec at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

If your routes have the same container you may define global container and omit `container` property in `Route` object:

```typescript
Router.container = '.page'; // You can read and write this property
```

If both global and local containers will be defined, local's one will be used.

### State

Every site need to have a state.
For creating it use `createState()` function. It accepts object with properties that need to be reactive.

Function returns `state` object that has properties from parameter's object. You can use that object to get or to update properties like in plain objects.

```typescript
const state = createState({ clicks: 0 });

const clicks = state.clicks;

state.clicks++; // Elements that depends from this property will be rerendered
```

> Object that returned by `createState()` function is fully reactive and can also be modified with other properties than was defined on initialization. You can add more properties and even delete them and all these changes will be reactive.

```typescript
const state = createState({ clicks: 0 });

// This is reactive
delete state.clicks;
// This is reactive too (setting new variable)
state.clicks = 0;
```

### I18n

Framework has `I18n` class for internationalization purposes.

`I18n` has three static methods:

1. `setLanguage(tag: string): Promise<void>` - change language on site. Reactively changes language on site.
2. `translate(path: string, variables?: { [string]: string }): string` - returns translated text for current language. **path** is string that provide path to text as object keys limited by dot and optional **variables** is object that pass variables into translated text.

```typescript
I18n.translate('home.menu.about');
```

For defining place for variable you must type `${variableName}` in translation object.

```typescript
const en = {
  greeting: 'Hello, ${name}!',
};
```

And then provide variable `name`:

```typescript
I18n.translate('greeting', { name: 'Peter' }); // Output will be "Hello, Peter!"
```

You may have many variables inside one text.

```typescript
const en = {
  greeting: 'Hello, ${name} ${surname}!',
};

I18n.translate('greeting', { name: 'Peter', surname: 'Dal' }); // Output will be "Hello, Peter Dal!"
```

3. `add(languages: I18nLanguagesSet, initial?: string): void` - add languages set to `I18n` object. `initial` is a optional tag that, if provided, will be used as initial language on the site. If it is omitted first language in set will be used.

```typescript
I18n.add(
  {
    uk: {
      home: {
        title: 'Ще один набридливий фреймворк.',
        menu: {
          docs: 'Документація',
          about: 'Про проект',
        },
      },
    },
    en: {
      home: {
        title: 'Another boring framework.',
        menu: {
          docs: 'Documentation',
          about: 'About project',
        },
      },
    },
  }
  // initial is optional. From example: will be "uk"
);
```

`I18n` has two static getters:

1. `languagesTags: string[]` - returns all tags for languages, that you set to `I18n.add` method.
2. `currentLanguage: string | undefined` - returns tag of current language or `undefined` if there is not setted any.

```typescript
I18n.languagesTags; // returns ['uk', 'en']
I18n.currentLanguage; // 'uk'
```

### Config

For configuration available points of framework use `Config` class.
It has:

1. `static get cssRootFolder(): string` - returns css root folder.
2. `static set cssRootFolder(dir: string): void` - change css root folder.
