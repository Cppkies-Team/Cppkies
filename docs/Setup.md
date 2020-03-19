### Setup

There are 2 ways of using Cppkies, installing with NPM or importing though `Game.LoadMod`.

### Using NPM - TS

Using Cppkies with NPM is the recommended way of using Cppkies, since you can split your code into files and use typescript.

To use Cppkies using NPM, you must install it first:

```sh
npm i cppkies
# Or if you are using yarn...
yarn add cppkies
```

Then you can use a bundler, like Webpack or Rollup, to bundle them.

```ts
import * as Cppkies from "cppkies"
Cppkies.onLoad.push(() => {
	new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
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
Cppkies.onLoad.push(() => {
	new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
```

### Setting up your Workspace - TS

<!-- Basically just creating a main mod file and explaining the benefits of separating your projects code into multiple files -->

### Creating your addon's backbone - JS & TS

<!-- All this would be is a simple explanation of pushing to functions, setting up Cppkies.onLoad, etc. -->
