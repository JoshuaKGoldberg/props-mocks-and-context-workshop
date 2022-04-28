# Props, Mocks, and Context: Unit Testing Heavy Components Workshop

Companion workshop to my [Props, Mocks, and Context: Unit Testing Heavy Components](https://1drv.ms/p/s!AvUc1cvPrJnWvtMop28KDmFo0iZApg?e=FpLgRA) talk.

Contains a superset of code examples from the [companion talk repository](https://github.com/JoshuaKGoldberg/props-mocks-and-context-talk).

## Setup

```shell
npm install
```

`npm run test` will run all tests.
You can also pass a partial name of a folder and/or file, like:

```shell
npm run test -- 00
```

Add `--watch` to start your terminal in watch mode.

## Workshop Notes

### Babel vs. ESBuild vs. SWC vs. ...

[Babel] is the traditional standard JavaScript transpiler.
Jest ships with it and will detect a Babel config file such as `.babelrc` by default.

Alternate bundlers/transpilers written in faster, low-level languages have become popular recently.
[ESBuild](https://esbuild.github.io) (Go) and [SWC](https://swc.rs) (Rust) seem to be the leaders.
https://blog.joshuakgoldberg.com/jest-babel-to-swc describes how I switched a (non-React) Jest suite to SWC for ~30-40% faster tests.

### Design Systems

For medium- and larger-sized applications, I strongly recommend separating components for common UI needs.
Buttons, headings, footers, etc.
Collections of those are often called design systems, or component systems, or other names.

Consider organizing that design system with [Atomic Design](bradfrost.com/blog/post/atomic-web-design) or a variant of it.

Consider using a builder such as [Chakra UI](chakra-ui.com) that lets you define components nicely.

### Proper DOM Queries

https://testing-library.com/docs/queries/about/#priority gives a great overview of the recommended preferred ways to query for DOM elements.
testing-library.com/docs/react-testing-library/cheatsheet has good summaries as well.

### "What in Components Should I Test?"

I recommend testing _logic the user cares about_.
Things like:

- When X prop is (true|false), Y thing (does|doesn't) happen
- When X element is clicked, Y function is called

For each test, I generally like two methodologies:

- Contents: AAA (see `src/realtime/aaa.js` for examples)
  - (A)rrange: set up components/state/stuff
  - (A)ct: perform some change/action
  - (A)ssert: test that the action changed the arranged stuff in a particular way
- Naming: GWT
  - Given: the component itself (not explicitly in the test name)
  - When: the (A)rrange & (A)ct
  - Then: the (A)ssert

For example, if I'm testing a component that has three props:

- `alignment`: 'left' | 'middle' | 'right'
- `showDescription`: whether to show the description
- `showImage`: whether to show the image

...and none of those props interact with each other, I'd probably have a total of six tests:

- `alignment`: whatever the default is, and another one
- `showDescription`: the true case and the false case
- `showImage`: the true case and the false case

See `src/realtime/TodoForm.test.js` for code examples.

> Tip: once you get to more than ~10 tests for a component, give or take, consider splitting the component up.
> It might be too complex to easily test & understand.

### Miscellaneous Links

- [react-use](github.com/streamich/react-use): a bit like lodash for React hooks
