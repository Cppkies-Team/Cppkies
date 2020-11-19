# Creating a Building

Buildings are the main way you make cookies in Cookie Clicker, and this is an tutorial to make one.

First, you must create art for the building, the icons must be 48x48 (24x24 scaled to 2\*) and [must be in a specific order, if not, you must use `relinkColumn`](/CommonProblems#IconOrder).

If you are coming from the setup tutorial this is what your mod should look like so far:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static" // The base for all your icons
Cppkies.onLoad.push(() => {})
```

The first step you'll need to follow is to tell Cppkies where your art for your building is.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
})
```

The next few lines need to tell Cppkies what the building is called.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		"Cppkie Baker", // The Name of your building
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
		"Generates cookies by baking them, why did nobody think about this?" // How your building generates cookies
	)
})
```

These lines are some more art data for your building.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		"Cppkie Baker",
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
		"Generates cookies by baking them, why did nobody think about this?",
		[0, 0], // The coords for the default icon for your building
		{
			bg: `${prefix}/buildingBg.png`, // The background for your building on the building screen
			pic: `${prefix}/buildingBake.png`, // The actual building pic on the building screen
			xV: 16, // The amount your building can move left and right on the building screen in pixels
			yV: 64, // The amount your building can move up and down on the building screen in pixels
		}
	)
})
```

And these lines are the numbers data for your building.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		"Cppkie Baker",
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
		"Generates cookies by baking them, why did nobody think about this?",
		[0, 0],
		{
			bg: `${prefix}/buildingBg.png`,
			pic: `${prefix}/buildingBake.png`,
			yV: 64,
			xV: 16,
		},
		Cppkies.DEFAULT_CPS, // Your buildings cps
		Cppkies.DEFAULT_ONBUY // The function to call when your building gets bought but don't worry about this
	)
})
```

The final touches to your building.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		"Cppkie Baker",
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
		"Generates cookies by baking them, why did nobody think about this?",
		[0, 0],
		{
			bg: `${prefix}/buildingBg.png`,
			pic: `${prefix}/buildingBake.png`,
			yV: 64,
			xV: 16,
		},
		Cppkies.DEFAULT_CPS,
		Cppkies.DEFAULT_ONBUY,
		{
			name: "Normal Baker",
			desc: "The top of your cookie hierarchy",
			icon: [1, 0],
		}, // Your buildings data on business day
		["Motivation!", "Distractions"] // Your building's building buff and building debuff
	)
})
```

If you finished these steps then you should have yourself all the code needed for a new building. For a recap here is all the code commented for your convenience.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		"Cppkie Baker", // The Name of your building
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
		"Generates cookies by baking them, why did nobody think about this?", // How your building generates cookies
		[0, 0], // The coordinates for the small, tooltip icon for your building
		[0, 0], // The coordinates for the big icon in the store for your building
		{
			bg: `${prefix}/buildingBg.png`, // The background for your building on the building screen
			pic: `${prefix}/buildingBake.png`, // The actual building pic on the building screen
			yV: 64, // The amount your building can move left and right on the building screen in pixels
			xV: 16, // The amount your building can move up and down on the building screen in pixels
		},
		Cppkies.DEFAULT_CPS, // Your buildings cps
		Cppkies.DEFAULT_ONBUY, // The function to call when your building gets bought but don't worry about this
		{
			name: "Normal Baker",
			desc: "The top of your cookie hierarchy",
			icon: [1, 0],
		}, // Your buildings data on business day
		["Motivation!", "Distractions"] // Your building's building buff and building debuff
	)
})
```
