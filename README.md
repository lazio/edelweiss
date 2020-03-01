# Edelweiss

**This is web framework that is written entirely as set of ES modules.**

ES modules are supported by almost all modern browser from 2017-2018 year.

`Edge`: from `16` version and `79` (Chromium).

`Firefox`: from `60`.

`Chrome`: from `61`.

`Safari`: from `11`.

`Opera`: from `48`.

[More info at caniuse.](https://caniuse.com/#search=es%20modules)

## Dig in

Importing from framework:

```javascript
import { Router } from '/path/to/@prostory/edelweiss/dist/index.mjs'
```

> Note that in current time you cannot import any package like you do with `require()`. You must provide absolute path from root of your project (site's root). It can be fixed by [import maps](https://github.com/WICG/import-maps), but it is not standard yet. Also only **.mjs** files can be imported. (See [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/))

This small framework does not use virtual DOM, but work with browser's DOM. 

### Template

Templates are wrote as html in template literals (similar to **JSX**) using `html`
function (exported from framework).

```javascript
const html = html`<p>Hello world!</p>`
```

You should pass valid HTML to `html`. But for convenience there is special syntax for
event listeners and boolean attributes.

1. In order to attach event listener to element you can define `@eventName` attribute
to element. Note `@` followed by `eventName`(*click*, *input*, *change* etc.). The value
of the attribute must be function, that accepts native *event* object, or object with
`handleEvent(event)` method. Otherwise an error will be thrown.

> Note that if you call *this* inside such funtion, in production you can receive `undefined` behavior [more detailed here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

```javascript
function handleClick(event) {
  console.log('Clicked!')
}
const button = html`
  <button @click=${handleClick}>Click me</button>
`
```

2. For defining attributes that do not have special values (truthy or falsy attributes:
`required`, `disabled`, `controls` etc.), you can append `?` to name of that attribute
and give him *true* of *false* value. 

> Actually that attribute can accept not only boolean values, but all truthy and
falsy values. Though `boolean` is recommended.

```javascript
function mustBeButtonDisabled() {
  // some calculation here
  return false
}
const button = html`
  <button class="disabled" ?disabled=${mustBeButtonDisabled()}>Click me</button>
`

const nextButton = html`
  <button class="disabled" ?disabled=${false}>Click me</button>
`

// You can define it as regular attribute.
const thirdButton = html`
  <button class="disabled" disabled>Click me</button>
`
```

Regular attributes can be defined as all above. They do not need special syntax.
But all inserted values must be type of `string` or coerce to it.
Also you can omit `"` and `'` around attribute value (not recommended). 

```javascript
const button = html`
  <button class="${isDisabled ? 'disabled' : ''}" disabled>Click me</button>
  <!-- or -->
  <button class=${isDisabled ? 'disabled' : ''} disabled>Click me</button>
`
```

`style` attribute can get string value of valid CSS or object which *keys* are valid
CSS properties and *values* are valid CSS values.

```javascript
const button = html`
  <!-- Style's values can be type of "string" or "number". -->
  const styles = {
    'background-color': 'red',
    width: '100%',
    color: 'white',
    'z-index': 1
  }
  <button style="${styles}">Click me</button>
  <!-- or -->

  const styles = 'background-color: red; width: 100%; color: white;'
  <button style=${styles}>Click me</button>
`
```

As children of the elements you pass values of types:

* `string`
* `Component`
* array of them

```javascript
function spans() {
  return strings.map(str => html`<span>${str}</span>`)
}

const template = html`
  ${new MyComponent()}
  <button class="disabled" ?disabled=${mustBeButtonDisabled()}>
    ${spans()}
  </button>
`
```

### Component

If you create template that can be used in two or more places of your site you can group it in plain function that will returns them or define *component*.

It can be achieved by creating class that extends `Component` class. You must override `template()` method that returns value of type `string`.
Also you can override `beforeBuild()` method that invokes before `template()` method and `afterBuild()` that invokes after `template()`. You can use them for getting data for your view or other tasks that need to be finished before or after building template.

> Note that while `beforeBuild()` and `afterBuild()` methods are executing template is not inserted into DOM, so you can't access elements that `template()` method returns.

```javascript
class MyComponent extends Component {
  beforeBuild() {
    // Some useful work
  }

  template() {
    return html`<p>Hello</p>`
  }

  afterBuild() {
    // Some useful work
  }
}
```

Also you can pass into `Component`'s constructor (not override!) object with `css` property that can be `string` (absolute path to css file that are associated with this component) or object that describes relative path to css file and contains `relativeTo` property (path to file or dir relative to which css file will be searched) and `cssFilePath` - relative path of css file to file or dir that specified in `relativeTo` property.

> Note: for specifying path to css file that is in the same directory you must provide object. It is not convinient so will be changed.

```javascript
class MyComponent extends Component {
  constructor() {
    super({
      css: {
        relativeTo: import.meta.url, // If file is in the same directory
        cssFilePath: './styles.css'
      }
    })
  }

  template() {
    return html`<p>Hello</p>`
  }
}
```

### Router

It is used for navigating through site and rendering. It interacts with browser's *History* API and, based on path of the page, renders needed nodes. `Router` has only static methods and static readable `current` field.

```javascript
import { Router } from '/path/to/@prostory/edelweiss/dist/index.mjs'
// It will always navigate to root page after reloading, opens "/" page even if address bar will have another path.
Router.to('/')

// It will navigate to page based on path in address bar. Reloading window in browser will not
// return to home page but stay in current page.
// It need to be put in script that is directly defined in HTML.
Router.to(window.location.pathname)
```

You must set up `Router` with routes. Route is a plain object:

```javascript
type Route = {
  path: string | RegExp,
  container: string,
  view: () => string | Component | (string | Component)[]
}
```

1. `path` - path of the page that will be visible in browser's search box.
2. `container` - selector of element with which nodes will be replaced.
3. `view` - function that returns nodes that need to be rendered.

```javascript
Router.add([
  {
    path: '/',
    container: '.body',
    view() {
      // We will think that HomePage is the component
      return new HomePage({
        // Custom component may accept some properties
      })
    }
  },
  // Many others routes
])
```

`Router` have five static methods:

1. `to(path: string, options?: { willStateChange?: boolean })` - Renders needed page. In some rare situations **window.history** does not need to be updated. In such cases provide object with `willStateChange` property setted to `false` as second parameter.
2. `reload()` - Reloads current page.
3. `back()` - return to previous page. 
4. `forward()` - forwards to next page if it is in history.
5. `add(routes: Route | Route[])` - add routes to `Router`. May be called many times.

Also it has static `current` field that contains information about current route (it is `Route` object).

### State

Every site need to have state.
For creating it use `createState()` function. It accepts object with properties that need to be reactive.

Function returns `state` object that has properties from parameter's object. You can use that object to get or to update properties like in plain objects.

```javascript
const state = createState({ clicks: 0 })

const clicks = state.clicks

state.clicks++ // Elements that depends from this property will be rerendered
```

> Object that returned by `createState()` function is fully reactive and can also be modified with other properties than was defined on initialization. You can add more properties and even delete them and all these changes will be reactive.

```javascript
const state = createState({ clicks: 0 })

// This is reactive
delete state.clicks
// This is reactive too (setting new variable)
state.clicks = 0
```

### I18n

Framework has `I18n` class for internationalization purposes.

`I18n` has three static methods:

1. `setLanguage(tag: string)` - change language on site. Reactively changes language on site.
2. `translate(path: string, variables?: { [string]: string }): string` - returns translated text for current language. **path** is string that provide path to text as object keys limited by dot and optional **variables** is object that pass variables into translated text.

```javascript
I18n.translate('home.menu.about')
```

For defining place for variable you must type `${variableName}` in translation object.

```javascript
const en = {
  greeting: 'Hello, ${name}!'
}
```

And then provide variable `name`:

```javascript
I18n.translate('greeting', { name: 'Peter' }) // Output will be "Hello, Peter!"
```

You may have many variables inside one text.

```javascript
const en = {
  greeting: 'Hello, ${name} ${surname}!'
}

I18n.translate('greeting', { name: 'Peter', surname: 'Dal' }) // Output will be "Hello, Peter Dal!"
```

3. `add(languages: I18nLanguagesSet, initial?: string)` - add languages set to `I18n` object. `initial` is a optional tag that, if provided, will be used as initial language on the site. If it is omitted first language in set will be used.

```javascript
I18n.add(
  {
    uk: {
      home: {
        title: 'Ще один набридливий фреймворк.',
        menu: {
          docs: 'Документація',
          about: 'Про проект'
        }
      }
    },
    en: {
      home: {
        title: 'Another boring framework.',
        menu: {
          docs: 'Documentation',
          about: 'About project'
        }
      }
    },
  },
  // initial is optional. From example: will be "uk"
)
```

`I18n` has one static getter:

1. `languagesTags: string[]` -  returns all tags for languages, that you set to `I18n.add` method.

```javascript
I18n.languagesTags // returns ['uk', 'en']
```

## Warning

Currently library is in beta, so any API may be changed. Always see **CHANGELOG** and **flow-typed** for types.
