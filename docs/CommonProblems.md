# Common Problems

## IconOrder

All icons in cookie clicker must follow an order due to the way it was implemented in cookie clicker.

### Icons

To make modding cookie clicker more accessible, Cppkies adds new functions for that, `relinkRow` and `relinkColumn`.

#### Relink Row

To relink a row (tier icons) you must use the `relinkRow` function.

(This function is asynchronous, so you must use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to use it)

Parameters:

1. `link` - `string` The link for the unarranged icons
2. `matrix` - `string[][] | string[]` The matrix of names of the icon types\*

\* Valid icon types are:

- Building ids: `1`, `5`, `7`, etc.
- Building names: `"cursor"`, `"farm"`, etc.
- Non-standard tier icon tiers: `"research"`, `"cookie"`, `"mouse"`, `"multicursor"`, `"kitten"`

Example:

<details>
  <summary>(The code is a bit large, so it's hidden by default)</summary>

```js
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

To relink a column (building icons) you must use the `relinkColumn` function.

(This function is asynchronous, so you must use [`async`/`await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to use it)

Parameters:

1. `link` - `string` The link for the unarranged icons
2. `matrix` - `string[][] | string[]` The matrix of names of the icon tiers\*

\* Valid tier names are:

- Tier ids: `1`, `5`, `7`, etc.
- Tier names: `"jetmint"`, `"plain"`, etc.
- Non-standard tier icon tiers: `"3d"`, `"milestone1"`, `"milestone2"`, `"milestone3"`, `"krumblor"`, `"level1"`, `"level2"`

Example:

<details>
  <summary>(The code is a bit large, so it's hidden by default)</summary>

```js
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

<!--TODO: Allow relinks to cross-reference icons -->

### Big Icons

There is no function to relink big icons in Cppkies, since it's just four images, the correct order is:

1. Unlocked normal big icon
2. Locked normal big icon (Black icon)
3. Unlocked business day big icon
4. Locked business day big icon (Black icon)

To see the position in practice, see [the official building big icons](http://orteil.dashnet.org/cookieclicker/img/buildings.png).
