# Hooks

Cppkies adds most of the custom APIs through hooks.

Cppkies creates the hooks by injecting code into functions.

## Parameters and example

Parameters:

1. `name` - `string` Name of the hook, use one of the names above as valid names
2. `func` - `(src: T) => T` The function to execute when the hook triggers, must pass the type of value as given, gives value can be seen in parentheses

For example:

```ts
Cppkies.hooks.on("cpsMult", mult => mult * 2)
Cppkies.buildingHooks.on("cps", cps => cps * 2)
```

## Hooks List

### Generic Hooks

- UI hooks
  - `menu` - called when any menu is opened (`void`)
  - `optionsMenu` - called when the options menu is opened (`void`)
  - `statsMenu` - called when the stats menu is opened (`void`)
  - `infoMenu` - called when the info menu is opened (`void`)
	- `tooltipDom` - called right after the tooltip is rendered (`HTMLDivElement`\*)
	- `tooltipString` - called right before the tooltip html string is set, used for more barbaric tooltip modifications  (`string`)
- Data hooks
  - `preSave` - called right before the game is saved (`void`)
  - `postSave` - called right after the game is saved (`void`)
  - `reset` - called when a save is wiped, first parameter is if the reset is hard (`boolean`\*)
  - `reincarnate` - called on reincarnation (`void`)
- Building hooks
  - `grandmaPic` - called when rendering grandmas, must return a link for an image (`string[]`)
  - `buildStore` - called after `Game.BuildStore` (`void`)
- Icon hooks
  - `getIcon` - called when resolving an icon via `Game.GetIcon`, usually used internally (`{ icon: Icon; tier: number | string; type: string }` -> `Icon`)
- Gameplay hooks
  - `cps` - called when CpS (cookies per second) is calculated (`number`)
  - `cpcAdd` - same as `cpc`, but before adding the default 1 CpC (and the three cursor \*2 upgrades)
  - `cpc` - called when calculating CpC (cookies per click) (`number`)
  - `rawCps` - called before `cps`, some calculations use raw CpS instead of normal CpS, for example, stocks (`number`)
  - `cpsMult` - called when calculating CpS, is the multiplier of CpS, some calculations use the multiplier (`number`)
  - `rawCpsMult` - called before `cpsMult`, is added to raw CpS, is the multiplier of CpS, some calculations use the multiplier (`number`)
  - `cursorFingerMult` - called when calculating cursor CpS and CpC, is the multiplier of finger upgrades (`number`)
  - `effs` - called when CpS is calculated, can control a lot of options. Gets the current effs, and must return multipliers for the effs. Read more at [Effects](types/Effects.md).
  - `buildingCps` - called when trying to calculate a building's cps (`{ building: Building; cps: number }` -> `number`)
- Vanilla hooks
  - `logic` - Called each logic frame (`void`)
  - `draw` - Called each draw frame (`void`)
  - `check` - Called every 5 seconds (`void`)
  - `ticker` - The news to display in the news ticker (`string[]`)

\* The function doesn't have to return anything
The hooks can be accessed with `Cppkies.hooks.on`

### Building Hooks

- `tooltip` - called on tooltip creation when hovering above a building (`{ building: Building; tooltip: string }` -> `string`)
- `buy` - called when the building is bought (`{ building: Building }` -> `void`)
- `levelUp` - called when the building is leveled up (`{ building: Building }` -> `void`)

The hooks can be accessed via `Cppkies.buildingHooks.on`

For example

```ts
Cppkies.buildingHooks.on("tooltip", ({ building, tooltip }) =>
	building.name === "Factory" ? tooltip + "<br>Child slavery bad" : tooltip
)
```

### Garden hooks

```ts
interface MutationInfo {
	neighs: Record<string, number>
	neighsM: Record<string, number>
	muts: [string, number][]
}

interface PlotBoostInfo {
	x: number
	y: number
	name: string
	age: number
	ageMult: number
	powerMult: number
	weedMult: number
	range: number
	// The effect multiplier from soils and etc.
	mult: number
}

interface BoostInfo {
	x: number
	y: number
	name: string
	age: number
	// The effect multiplier from the soil and etc. Your custom effects should be multiplied by `mult`
	mult: number
	effs: Game.Effects
}
```

- `mutations` - Called when a mutation is considered for an empty tile (`MutationInfo` -> `MutationInfo`)
- `plotBoosts` - Called when plot boosts are calculated (`PlotBoostInfo` -> `PlotBoostInfo`)
- `boosts` - Called when boosts from a plant are calculated (`BoostInfo` -> `BoostInfo`)
