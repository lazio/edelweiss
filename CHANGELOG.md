# 0.8.1

- To `Router.current` field is added property *parameters* that contains path parameters if there will be ones.
- Update README.

## 0.8.0

- Fix bug with `Component` in `html()` function - it did not execute `beforeBuild()` and `afterBuild()` methods.
- Make `html`, `template()`, `beforeBuild()` and `afterBuild()` asyncronous. This is not breaking change - code from **0.7.5** will work without changes.
- Update README.

## 0.7.7

- Add ability to pass styles as object to *style* attribute.
- Fix typos in README.

## 0.7.6

- Fix checking of the type of variable that are used by elements diffing.

## 0.7.5

- Remove exessive code from `Router.back()` and `Router.forward()` methods.
- Add ability to navigate through browser's *back* and *forward* buttons.
- Add *options* optional parameter to `Router.to()` method.

## 0.7.4

- Fix diffing DOM when child of element is *textContent*. Now if it still the same -
*textContnent* of old element is not replaced.

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
plain *state* object.
- Remove `render` function from export. Use `Router` instead.
- Improve README.

## 0.4.0

- Add `I18n` class that repersents localization functionality.
- Add log when container does not exist on the page in `render`.
- Add *I18n* section to README.

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
- Make 6 separate *headings* classes.

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