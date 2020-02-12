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

Importing library:

```javascript
import { ENode } from '/path/to/@prostory/edelweiss/dist/index.mjs'
```

> Note that in current time you cannot import any package like you do with `require()`. You must provide absolute path from root of your project (site's root). It can be fixed by [import maps](https://github.com/WICG/import-maps), but is is not standard yet. Also only **.mjs** files can be imported. (See [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/))

This small framework does not use virtual DOM, but work with browser's DOM. All HTML tags are wrapped in classes (*A*, *Div*, *Main* and so on.). They extend *ENode* class.
Many of them can accept three objects (in such order): 

1. `children` - internal nodes that can contain this node. It can be `string`, `ENode`, `Component` or array of them.
2. `attributes` - object whose keys are attribute names and values is attribute values.
3. `listeners` - an object with methods. Name of the method must be like name of type of event: *click*, *keyup* and so on. It accepts raw `event` object.

```javascript
const footer = new Footer(
  new Button(
    'Click me) I am a cool button!',
    { style: 'margin: 0;' },
    {
      click(event) {
        console.log('Clicked')
      },
    }
  ),
  {
    class: 'footer',
    style: 'padding: 15px; background-color: #cecece;',
  },
)
```

Some classes such as `Wbr` does not accept `children` object. See [empty elements](https://developer.mozilla.org/en-US/docs/Glossary/empty_element):

```javascript
const wbr = new Wbr(
  { /* some attributes */ },
  // Wbr also does not accept listeners object.
)
```

For information about such classes see [edelweiss.js](./flow-typed/edelweiss.js) types definition in *flow-typed* directory.

### Component

If you create template that can be used in two or more places of your site you can group it in plain function that will returns them or define *component*.

It can be achieved by creating class that extends `Component` class. You must override `build()` method that can returns `ENode`, `string`, another `Component` or array of them.
Also you can override `beforeBuild()` method that invokes before `build()` method and `afterBuild()` that invokes after `build()`. You can use them for getting data for your view or other tasks that need to be finished before or after rendering.

```javascript
class MyComponent extends Component {
  beforeBuild() {
    // Some useful work
  }

  build() {
    return new H1('Hello world!', { class: 'title' })
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

  build() {
    return new H1('Hello world!', { class: 'title' })
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
  view: () => string | ENode | Component | (string | ENode | Component)[],
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

1. `to(path: string)` - Renders needed page.
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

state.clicks++ // Nodes that depends from this property will be rerendered
```

### I18n

Framework has `I18n` class for internationalization purposes.

`I18n` has four static methods:

1. `setLanguage(tag: string)` - change language on site. Reactively changes language on site.
2. `translate(path: string): string` - returns translated text for current language. **path** is string
  that provide path to text as object keys limited by dot.

```javascript
I18n.translate('home.menu.about')
```

3. `add(languages: I18nLanguagesSet, initial?: string)` - add languages set to `I18n` object. `initial` is a optional tag that, if provided, will be used ad initial language on the site. If it is omitted first language in set will be used.

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
  // initial is optional
)
```

4. `getLanguagesTags(): string[]` -  returns all tags for languages, that you set to `I18n.add` method.

```javascript
I18n.getLanguagesTags() // returns ['uk', 'en']
```

## Warning

Currently library is in beta, so any API may be changed. Always see **CHANGELOG** and **flow-typed** for types.
