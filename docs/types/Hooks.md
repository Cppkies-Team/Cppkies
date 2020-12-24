# Hooks

Cppkies adds most of the custom APIs through hooks.

Cppkies creates the hooks by injecting code into functions.

## Parameters and example

Parameters:

1. `name` - `string` Name of the hook, use one of the names above as valid names
2. `func` - `(src: T) => T` The function to execute when the hook triggers, must pass the type of value as given, gives value can be seen in parentheses

For example:

```ts
Cppkies.on("cpsMult", mult => mult * 2)
Cppkies.buildingHooks.Factory.on("cps", cps => cps * 2)
```

## Hooks List

### Generic Hooks

- Menu hooks
  - `menu` - called when any menu is opened (`void`)
  - `optionsMenu` - called when the options menu is opened (`void`)
  - `statsMenu` - called when the stats menu is opened (`void`)
  - `infoMenu` - called when the info menu is opened (`void`)
- Data hooks
  - `preSave` - called right before the game is saved (`void`)
  - `postSave` - called right after the game is saved (`void`)
  - `reset` - called when a save is wiped, first parameter is if the reset is hard (`boolean`\*)
  - `reincarnate` - called on reincarnation (`void`)
- Building hooks
  - `grandmaPic` - called when rendering grandmas, must return a link for an image (`string[]`)
  - `buildStore` - called after `Game.BuildStore` (`void`)
- Gameplay hooks
  - `cps` - called when CpS (cookies per second) is calculated (`number`)
  - `cpc` - called when calculating CpC (cookies per click) (`number`)
  - `rawCps` - called before `cps`, some calculations use raw CpS instead of normal CpS, for example, stocks (`number`)
  - `cpsMult` - called when calculating CpS, is the multiplier of CpS, some calculations use the multiplier (`number`)
  - `cursorFingerMult` - called when calculating cursor CpS and CpC, is the multiplier of finger upgrades (`number`)
- Vanilla hooks
  - `logic` - Called each logic frame (`void`)
  - `draw` - Called each draw frame (`void`)
  - `check` - Called every 5 seconds (`void`)
  - `ticker` - The news to display in the news ticker (`string[]`)

\* The function doesn't have to return anything
The hooks can be accessed via `Cppkies.on` or `Cppkies.hooks.on`

### Building Hooks

- `tooltip` - called on tooltip creation when hovering above a building (`string`)
- `cps` - called when calculating the building CpS (`number`)

The hooks can be accessed via `Cppkies.buildingHooks[buildingName].on`

For example

```ts
Cppkies.buildingHooks.Factory.on("cps", cps => cps * 2)
```
