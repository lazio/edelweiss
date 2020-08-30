# [1.1.3] - 2020-08-31

### Fixed

- Updating text nodes, if they have element nodes as siblings.

## [1.1.2] - 2020-08-25

### Fixed

- Instance of `Component` now handled properly as child in `Array`.

## [1.1.1] - 2020-08-25

### Changed

- Bump packages.

## [1.1.0] - 2020-08-24

### Changed

- `registerCss` funtion now returns function, that allow unregister css.

### Fixed

- `index.d.ts` file now does not contain module declaration.

## [1.0.0] - 2020-08-16

### Changed

- `reload` method of `Router` returns now Promise.
- `setLanguage` method of `I18n` returns now Promise.

## [1.0.0-alpha-6] - 2020-07-21

### Changed

- Remove `customElement` from TS's declaration file.
- Add ability to add spaces between separators in custom element declaration.

## [1.0.0-alpha-5] - 2020-07-20

### Fixed

- `render` method - Unhandled Promise rejection error.

## [1.0.0-alpha-4] - 2020-07-20

### Added

- `Config` class with `cssRootFolder` property.

### Changed

- Add inner methods for creatings DOM elements.
- Rewrite _styles.mjs_ in functional way.

## [1.0.0-alpha-3] - 2020-07-20

### Added

- TypeScript definition file.

### Changed

- Improve inner structure of `I18n` class.

## [1.0.0-alpha-2] - 2020-07-19

### Changed

- Improve inner structure of code.

## [1.0.0-alpha-1] - 2020-07-18

### Added

- Changing bundler from `gulp` to `rollup`.
- Add CommonJS version of framework.

### Removed

- `customElement` function from exports.

### Changed

- `view` in `Route` can now return `Promise<string>` also.

## [0.12.0] - 2020-06-6

### Added

- Creating custom element directly from `html` template.

### Deprecated

- Using `customElement` directly. In next version this function will not be exported from library.

## [0.11.0] - 2020-05-26

### Added

- `before` and `after` hooks to routes.

## 0.10.3

- **Breaking changes!**: remove ability to load styles is `Component`'s constructor.
- Add `styles` method to `Component` class.
- Sort imports on name length.

## 0.10.2

- Use `Reflect` in `createState` function.
- Change `lang` attribute in `<html>` on `I18n.setLanguage` method.

## 0.10.1

- Remove unnecessary and buggy `isBrowser` and `isServer`.

## 0.10.0

- Add `registerCss()` function.
- Change mechanism of style loading. **Breaking changes!**: `Component`'s constructor accepts now object with _css_'s value of type _string_ or _string[]_. Values must be **names** of css files with or without extension.

## 0.9.0

- Add `customElement()` function.
- Remove duplicate of _TrustedTypes_ definition.

## 0.8.7

- Remove unnesessary attribute regexp.
- Make `Router.to` and `Router.reload` asyncrounous.
- Write tests for `Router`.

## 0.8.6

- Make `Router.current` _non void_ parameter.
- Remove replacing `window.history.state` on reloading current window (state did not change so it is unnesessary action).

## 0.8.5

- Add property `Router.container` and make `container` property in route object optional.

## 0.8.4

- Write more tests.
- Add more type checking of type of variable that passed to `html()` function.
- Update README.

## 0.8.3

- Add type checking for translated value in `I18n.translate()`.
- Small changes in `Router` class (new _routes_ store).

## 0.8.2

> This version fix bug with class properies in **0.8.1** version!

- Make `Router.current` as getter.
- Add `I18n.currentLanguage` getter.
- Handle error when current language is unset.
- Handle error when _path_ passed to `I18n.translate` points to `null`, `undefined` and `Array`.
- Update typing and README.

## 0.8.1

- To `Router.current` field is added property _parameters_ that contains path parameters if there will be ones.
- Update README.

## 0.8.0

- Fix bug with `Component` in `html()` function - it did not execute `beforeBuild()` and `afterBuild()` methods.
- Make `html`, `template()`, `beforeBuild()` and `afterBuild()` asyncronous. This is not breaking change - code from **0.7.5** will work without changes.
- Update README.

## 0.7.7

- Add ability to pass styles as object to _style_ attribute.
- Fix typos in README.

## 0.7.6

- Fix checking of the type of variable that are used by elements diffing.

## 0.7.5

- Remove exessive code from `Router.back()` and `Router.forward()` methods.
- Add ability to navigate through browser's _back_ and _forward_ buttons.
- Add _options_ optional parameter to `Router.to()` method.

## 0.7.4

- Fix diffing DOM when child of element is _textContent_. Now if it still the same -
  _textContnent_ of old element is not replaced.

## 0.7.3

- Add support for [`trustedTypes`](https://github.com/w3c/webappsec-trusted-types).
- Simplify internal `render()` function.

## 0.7.2

- Add possibility to pass variables to `I18n.translate()` method.
- Update README.

## 0.7.1

- Add trap for `delete` operator to **state**.
- Update README.
- Update devDependencies.

## 0.7.0

- Completely rewrite template part of framework. Now instead of separate functions
  (`a(...)`, `div(...)`) templates are created as template literals (html function).
- Update README.

## 0.6.1

- Fix `back()` and `forward()` methods of `Router` class.
- Update typings.

## 0.6.0

- Rewrite node classes to plain functions (`new A(...)` to `a(...)` and so on.).
- Replace `I18n.getLanguagesTags(): string[]` method with `I18n.languagesTags: string[]` getter.
- Update typings.
- Update README.

## 0.5.2

- Add `I18n.getLanguagesTags(): string[]` method.

## 0.5.1

- Fix typo in `flor-typed/edelweiss.js`

## 0.5.0

- Make all methods and properties of `Router` and `I18n` classes static.
- Add `Router.add(routes: Route | Route[])` method.
- Add `I18n.add(languages: I18nLanguagesSet, initial?: string)` method.
- Remove `onChange` function from state object. Now `createState` returns
  plain _state_ object.
- Remove `render` function from export. Use `Router` instead.
- Improve README.

## 0.4.0

- Add `I18n` class that repersents localization functionality.
- Add log when container does not exist on the page in `render`.
- Add _I18n_ section to README.

## 0.3.3

- Minify distributed code.
- Add build system `gulp`.

## 0.3.2

- Make possible to reload current page without returning to home page. Or open specific route from address bar.
- Add errors in `State` if some needed properties are missing or used do not fully.

## 0.3.1

- Fix typos in README.

## 0.3.0

- Change signatures of all classes that inherits from `ENode` (except `Custom`). Now
  they stricter limit its options.
- Make 6 separate _headings_ classes.

## 0.2.0

- Change asyncronous functions to syncronous in `Component`, `render` and in `ENode`.
- Implement rendering based on difference of old DOM and new DOM.
- Cnhange signature of `onChange` function of `createState`.
- Write more info to README.
- Add CHANGELOG.

## 0.1.2

- Fix bug with rendering nested elements.

## 0.1.1

- Add some documentation.

## 0.1.0

- Creates all main components of framework.
