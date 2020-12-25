# Setup

There are 2 ways of using Cppkies, installing with NPM or importing though `Game.LoadMod`.

## Using NPM - JS or TS

Using Cppkies via NPM is the recommended way of using Cppkies, since you can split your code into files, use typescript, and have IDE autocompletion.

To use Cppkies using NPM, you must install it first:

```sh
npm i cppkies
# Or if you are using yarn...
yarn add cppkies
```

Then you can use a bundler, like Webpack or Rollup, to bundle them.

```js
import * as Cppkies from "cppkies"
Cppkies.onLoad.push(() => {
	new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
```

(If you want a simple template to easily start working, you should check out [TheGLander/CppkiesModExample](https://github.com/TheGLander/CppkiesModExample))

## Importing through `Game.LoadMod` - JS

Importing Cppkies through `Game.LoadMod` is not recommended since you can't split your code into multiple files, use typescript, or have IDE autocompletion. This is recommended only if the mod is really small.

To import it, you need to start your mod with

```ts
Game.LoadMod("https://unpkg.com/cppkies")
```

For example:

```ts
Game.LoadMod("https://unpkg.com/cppkies")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
```

