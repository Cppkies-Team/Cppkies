# Common Problems

## IconOrder

All icons in cookie clicker must follow an order due to the way it was implemented in cookie clicker.

### Icons

To make modding cookie clicker more accessible, Cppkies adds new functions for that, `relinkRow` and `relinkColumn`.

#### Relink Row

To relink a row (tier icons) you must use the `relinkRow`.

For example

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

<!--TODO: Allow relinks to cross-reference icons -->

### Big Icons
