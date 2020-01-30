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
import { ENode } from '/path/to/@prostory/edelweiss'
```

> Note that in current times you canot import any package as it is in *commonjs* module system. You must provide absolute path from root of your project (site's root). It can be fixed be [import maps](https://github.com/WICG/import-maps), but is is not standard yet.

This small framework does not use virtual DOM, but work with browser's DOM. All HTML tags are wrapped in classes (*A*, *Div*, *Main* and so on.). They extend *ENode* class.
All of them accept `options` object that can have three properties: 

1. `attributes` - object whose keys are attribute names and values is attribute values.
2. `children` - internal nodes that can contain this node. It can be `string`, `ENode`, `Component` or array of them.
3. `listeners` - an object with methods. Name of the method must be like name of type of event: *click*, *keyup* and so on. It accepts raw `event` object.

```javascript
const footer = new Footer({
  attributes: {
    class: 'footer',
    style: 'padding: 15px; background-color: #cecece;'
  },
  children: new Button({
    attributes: {
      style: 'margin: 0; padding: 5px 10px; border: none; outline: none; background-color: blue; color: black;'
    },
    children: 'Click me) I am a cool button!',
    listeners: {
      click(event) {
        console.log('Clicked')
      }
    }
  })
})
```

Some classes such as `A` accept not only `options` object, but also have parameters that are specific for this tag or is hightly recommended.

```javascript
const a = new A(
  '#', // href attribute

  // Note that you can provide href attribute in attributes property. And it will override one that is defined above. So try to avoid it.
  { /* some properties */ }
)
```

For information about such classes see [edelweiss.js](./flow-typed/edelweiss.js) types definition in *flow-typed* directory.

### Component

If you create template that can be used in two or more places of your site you can group it in plain function that will returns them or define *component*.

It can be achieved by creating class that extends `Component` class. You must override `build()` method that can returns `ENode`, `string`, another `Component` or array of them.
Also you can override `beforeBuild()` method that invokes before `build()` method and `afterBuild()` that invokes after `build()`. They return promises, so you can use them for getting data for your view or other tasks that need to be finished before or after rendering.

```javascript
class MyComponent extends Component {
  async beforeBuild() {
    // Some useful work
  }

  async build() {
    return new H(1, {
      attributes: { class: 'title' },
      children: 'Hello world!'
    })
  }

  async afterBuild() {
    // Some useful work
  }
}
```

Also you can pass into `Component`'s constructor (not override!) object `css` property that can be `string` (absolute path to css file that are associated with this component) or object that describes relative path to css file and contains `relativeTo` property (path to file or dir relative to which css file will be searched) and `cssFilePath` - relative path of css file to file or dir that specified in `relativeTo` property.

> Note: for specifying path to css file that is in the same directory you must provide object. It is not convinient so will be changed.

```javascript
class MyComponent extends Component {
  constructor() {
    super({
      relativeTo: import.meta.url, // If file is in the same directory
      cssFilePath: './styles.css'
    })
  }

  async build() {
    return new H(1, {
      attributes: { class: 'title' },
      children: 'Hello world!'
    })
  }
}
```

### render

It is the function that inserts builded nodes into DOM.
Function accepts selector that will be replaced with nodes and nodes as the second parameter. You probably
will not using it directly.

```javascript
render(
  '.body',
  new MyComponent()
)
```

### Router

If you are creating SPA, you probably do not need it.

It is used for navigating through site. It interacts with browser's *History* API and, based on path of the page, renders needed nodes.

```javascript
router.to('/')
```

While creating `Router` instance you must give him routes. Route is plain object:

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
const router = new Router([
  {
    path: '/',
    container: '.body',
    view() {
      // We will think that HomePage is the component
      return new HomePage({
        // some properties
      })
    }
  },
  // Many others routes
])
```

`Router` have four methods:

1. `to(path: string)` - it is asyncrounous method. Renders needed page.
2. `reload()` - it is asyncrounous method. Reloads current page.
3. `back()` - return to previous page. 
3. `forward()` - forwards to next page if it is in history.

Also it can `current` field that contains information about current route (it is object that you pass to `Route`s constructor).