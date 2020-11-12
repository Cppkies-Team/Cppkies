### Setup

There are 2 ways of using Cppkies, installing with NPM or importing though `Game.LoadMod`.

### Using NPM - JS or TS

Using Cppkies with NPM is the recommended way of using Cppkies, since you can split your code into files and use typescript.

To use Cppkies using NPM, you must install it first:

```sh
npm i cppkies
# Or if you are using yarn...
yarn add cppkies
```

Then you can use a bundler, like Webpack or Rollup, to bundle them.

```ts
import * as Cppkies from "cppkies"rm
new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
```

### Importing through `Game.LoadMod` - JS

Importing Cppkies through `Game.LoadMod` is not recommended since you can't split your code into multiple files or use typescript.

To import it, you need to start your mod with

```js
Game.LoadMod("https://unpkg.com/cppkies")
```

For example:

```js
Game.LoadMod("https://unpkg.com/cppkies")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
```

### Setting up your Workspace - TS

If you want to use webpack or rollup, use must use [npm](https://npmjs.org) which is bundled with node, download for can be found for it [here](https://nodejs.org/en/download). After creating a `package.json`(`npm init`), you must setup rollup or webpack,
documentation for which can be found here ([rollup](https://rollupjs.org/guide/en/#quick-start), [webpack](https://webpack.js.org/concepts/)).
