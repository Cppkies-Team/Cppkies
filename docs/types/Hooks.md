# Hooks

Cppkies adds most of the custom APIs through hooks.

Cppkies creates the hooks by injecting code into functions.

## Hooks List

### Generic Hooks

- Menu hooks
  - `menu` - called when any menu is opened (`void`)
  - `optionsMenu` - called when the options menu is opened (`void`)
  - `statsMenu` - called when the stats menu is opened (`void`)
  - `infoMenu` - called when the info menu is opened (`void`)
- Data hooks
  - `preSave` - called right before the game is saved
  - `reset` - called when a save is wiped, first parameter is if the reset is hard. -->
- Building hooks
  - `grandmaPic` - called when rendering grandmas, must return a link for an image (`string[]`)
  - `buildStore` - called after `Game.BuildStore` (`void`)
- Gameplay hooks
  - `cps` - called when CpS (cookies per second) is calculated (`number`)
  - `rawCps` - called before `cps`, some calculations use raw CpS instead of normal CpS, for example, stocks (`number`)
  - `cpsMult` - called when calculating CpS, is the multiplier of CpS, some calculations use the multiplier

The hooks can be accessed via `Cppkies.on` or `Cppkies.hooks.on`

Parameters:

1. `name` - `string` Name of the hook, use one of the names above as valid names
2. `func` - `(src: T) => T` The function to execute when the hook triggers, must pass the type of value as given, gives value can be seen in parentheses

For example:

```js
Cppkies.on("cpsMult", mult => mult * 2)
```

### Building Hooks

- `tooltip` - called on tooltip creation when hovering above a building
