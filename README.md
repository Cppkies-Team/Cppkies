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

## Examples

[Think Tank building](https://github.com/Cppkies/Examples)

## Roadmap

- [x] Buildings
- [ ] Upgrades
- [ ] Achievements
- [ ] Heavenly Upgrades
- [ ] Garden hooks
- [ ] Lumps
- [ ] More?

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

#### 18/03/20

- Redo changelog

#### 10/02/20 - V0.0.0

- Created the github repo
- Created the structure of a readme
