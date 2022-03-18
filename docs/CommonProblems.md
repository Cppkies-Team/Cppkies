# Common Problems

## IconOrder

All tiered icons in Cookie Clicker must follow an order, due to implementation reasons.

### Icons

To make modding Cookie Clicker more accessible, Cppkies adds new functions for changing the icon positions at runtime: `relinkRow`, `relinkColumn`, and `patchIconsheet`.

#### Relink Row

To configure icon positions for custom tier icons the `relinkRow` function must be used.

(This function is asynchronous, so you must use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to use it)

Parameters:

1. `link` - `string` The link for the unarranged icons
2. `matrix` - `string[][] | string[]` The matrix of names of the icon types\*
3. `offset` - `number` If set, instead of using the automatic offset (+1 Y for each tier relinked with the URI), uses this manual offset
4. `followAlias` - `boolean` If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)

\* Valid icon types are:

- Building ids: `1`, `5`, `7`, etc.
- Building names: `"cursor"`, `"farm"`, etc.
- Non-standard tier icon tiers: `"research"`, `"cookie"`, `"mouse"`, `"multicursor"`, `"kitten"`.

Cppkies automatically detects all buildings, even modded ones.

Example:

<details>
  <summary>(The code is a bit large, so it's hidden by default)</summary>

```ts
Cppkies.icons.relinkRow(
	"https://pipe.miroware.io/5fb27f0be6bde66c95ca6ca3/complete2.png",
	[
		[],
		[],
		[
			"cursor",
			"grandma",
			"farm",
			"mine",
			"factory",
			"shipment",
			"alchemy lab",
			"portal",
			"time machine",
			"research",
			"cookie",
			"mouse",
			null,
			"multicursor",
			"antimatter condenser",
			"prism",
			"bank",
			"temple",
			"wizard tower",
			"kitten",
			"chancemaker",
			"fractal engine",
			"javascript console",
			"idleverse",
		],
	]
)
```

</details>

#### Relink Column

To configure icon positions for custom building icons the `relinkColumn` function must be used.

(This function is asynchronous, so you must use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to use it)

Parameters:

1. `link` - `string` The link for the unarranged icons
2. `matrix` - `string[][] | string[]` The matrix of names of the icon tiers\*
3. `offset` - `number` If set, instead of using the automatic offset (+1 X for each building relinked with the URI), uses this manual offset
4. `followAlias` - `boolean` If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)

\* Valid tier names are:

- Tier ids: `1`, `5`, `7`, etc.
- Tier names: `"jetmint"`, `"plain"`, etc.
- Non-standard tier icon tiers: `"3d"`, `"milestone1"`, `"milestone2"`, `"milestone3"`, `"krumblor"`, `"level1"`, `"level2"`

Cppkies automatically detects all tiers, even modded ones.

Example:

<details>
  <summary>(The code is a bit large, so it's hidden by default)</summary>

```ts
Cppkies.icons.relinkColumn(
	"https://raw.githubusercontent.com/Cppkies-Team/examples/master/static/buildingIcons.png",
	[
		[1, 2, 3, 4, 5, 6, 7, 8],
		[9, 10, 11, 12, 13, "fortune", "synergy2", "synergy1"],
		[
			"3d",
			"krumblor",
			"milestone1",
			"milestone2",
			"milestone3",
			"level1",
			"level2",
		],
	]
)
```

</details>

#### Patch Icon sheet

To add icons to an iconsheet from another one, `patchIconsheet` must be used.

(This function is asynchronous, so you must use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to use it)

Parameters:

1. `link` - `string` The link to the original, unpatched iconsheet
2. `matrix` - `[[number, number],`[`Game.Icon`](./types/Icon.md)`][]` The replacements to make, first element in the tuple is the original position, second is the icon to replace with
3. `followAlias` - `boolean` If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)

Example:

<details>
  <summary>(The code is a bit large, so it's hidden by default)</summary>

```ts
Cppkies.icons.relinkRow(
	// This creates the aura tier icons, the iconsheet doesn't have the in-game cursor building icon
	"https://pipe.miroware.io/5fb27f0be6bde66c95ca6ca3/complete2.png",
	[
		[
			null,
			"grandma",
			"farm",
			"mine",
			"factory",
			"shipment",
			"alchemy lab",
			"portal",
			"time machine",
			"research",
			"cookie",
			"mouse",
			null,
			"multicursor",
			"antimatter condenser",
			"prism",
			"bank",
			"temple",
			"wizard tower",
			"kitten",
			"chancemaker",
			"fractal engine",
			"javascript console",
			"idleverse",
		],
	]
)

// This replaces the most top left icon of the relinked icons with the icon of the "Aura gloves" heavenly upgrade
Cppkies.icons.patchIconsheet(
	"https://pipe.miroware.io/5fb27f0be6bde66c95ca6ca3/complete2.png",
	[[[0, 0], Game.Upgrades["Aura gloves"].icon]]
)
```

</details>

### Big Icons

There is no function to relink big icons in Cppkies, since it's just four images, the correct order is:

1. Unlocked normal big icon
2. Locked normal big icon (Black icon)
3. Unlocked business day big icon
4. Locked business day big icon (Black icon)

To see the position in practice, see [the official building big icons](http://orteil.dashnet.org/cookieclicker/img/buildings.png).
