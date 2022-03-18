# Setup

There are 2 ways of using Cppkies, installing with NPM or importing though `Game.LoadMod`.

Using Cppkies from NPM requires local setup and more programming knowledge, but allows for treeshaking, TypeScript, better editor support, multiple files in the mod, and small final mod files.

Using Cppkies via `Game.LoadMod` is easier and doesn't require any preparation, but lacks the abovementioned features.

<!-- tabs:start -->

### **NPM**

Before writing any code, [Node.js](https://nodejs.org/) (and, optionally, [Yarn](https://yarnpkg.com/)) must be installed.

Writing the setup code is tedeous, so we've already made a setup kit for you! Just clone [TheGLander/CppkiesModExample](https://github.com/TheGLander/CppkiesModExample) and make sure to update the metadata in `package.json`.

Once project setup is done, the build system and Cppkies can be installed with

```sh
npm i
# or...
yarn
```

In code, Cppkies can be used like

```ts
import { Mod } from "cppkies"

new Mod(
	{
		keyname: "neatMod",
		version: "1.0",
	},
	() => {
		// Write code here!
	}
)
```

### **loadMod**

This one is way easier. Just open any text editor and start writing code!

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(
	() =>
		new Cppkies.Mod(
			{
				keyname: "neatMod",
				version: "1.0",
			},
			() => {
				// Write code here!
			}
		)
)
```

<!-- tabs:end -->
