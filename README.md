# Cppkies

![Cppkies](./static/CppkiesLogo.png?raw=true)

## Table of Contents

- [What Is Cppkies?](#What-is-Cppkies?)
- [Getting Started](#Getting-Started)
  - [Using NPM](#Using-NPM)
  - [Importing through `Game.LoadMod`](#Importing-through-`Game.LoadMod`)
- [Documentation](#Documentation)
- [Examples](#Examples)
- [Roadmap](#Roadmap)
- [Changelog & Credits](#Changelog-&-Credits)
  - [Credits](#Credits)
  - [Changelog](#Changelog)

## What is Cppkies

Cppkies is a modding framework for the game [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/). It intends to make modding the game very simple.

## Getting Started

There are 2 ways of using Cppkies, installing with NPM or importing though `Game.LoadMod`

### Using NPM

Using Cppkies with NPM is the reccomended way of using Cppkies, since you can split your code into files and use typescript.

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

### Importing through `Game.LoadMod`

Importing Cppkies through `Game.LoadMod` is not reccomended since you can't split your code into multiple files or use typescript.

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

## Documentation

The documentation is located [here](https://cppkies-team.github.io/Cppkies/#/Setup).

## Examples

Examples:

### [Think Tank Building](https://github.com/Cppkies/Examples/ThinkTank)

This addon provides an example on how to create a new building new upgrades and new achievements. Sprites by "Bt Y#0895".

### [LumpExample](https://github.com/Cppkies/Examples/LumpExample)

This addon provides an example of creating a new lump type.

### [BuffExample](https://github.com/Cppkies/Examples/BuffExample)

This addon provides an example of creating a new buff type, and adding a buff type to golden cookies.

### [GardenExample](https://github.com/Cppkies/Examples/GardenExample)

This addon provides an example of creating a new plant<!--, and maybe a new soil type. Not sure if it's possible.-->.

## Roadmap

- [x] Buildings
- [ ] Upgrades
  - [ ] Fortune Upgrades
  - [ ] Seasonal Upgrades
  - [ ] Heavenly Upgrades
- [ ] Achievements
- [ ] Garden Hooks
- [ ] Temple Hooks <!-- Maybe? -->
- [ ] Grimoire Hooks <!-- Maybe? -->
- [ ] Lumps
  <!-- More? -->

## Changlog & Credits

### Credits

- [TheGLander](https://github.com/TheGLander) (ʐ̈ MANNNNNNN#2006) :
  - Programer
- [Bob](https://github.com/MasterOfBob777) (MasterOfBob777#8346) :
  - Programer
- [TheSkullyKO](https://github.com/TheSkullyKO) (Mistow OwO#0245) :
  - Helped with Ideas
- [Klattmose](https://github.com/klattmose/) :
  - Gave us the idea to begin the project

### Changelog

19/3/20 - V0.1.3

- Create `.npmignore`

19/3/20 - V0.1.2

- Manually add Cppkies to `window`
- Remove unnecessary Cppkies definitions

19/3/20 - V0.1.1

- Patch declaration files

18/3/20 - V0.1.0 Cppkie Crumbles

- Created the docs with [Docsify](https://docsify.js.org/#/)
- Redid the readme
- Added Buildings API
- Published to NPM

10/2/20 - V0.0.0

- Created the github repo
- Created the structure of a readme
