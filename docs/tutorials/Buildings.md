# Creating a Building

Buildings are the main way you make cookies in Cookie Clicker, and this is an tutorial to make one.

If you are coming from the setup tutorial this is what your mod should look like so far:

```ts
import Cppkies from "cppkies"
Cppkies.onLoad.push(() => {})
```

The first step you'll need to follow is to tell Cppkies where your art for your building is.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static" // A link to your building's art.
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png` // Building big icons
	Cppkies.iconLink = `${prefix}/buildingIcons.png` // Building normal icons
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
		}, // Your building's data on business day
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
		Cppkies.DEFAULT_CPS, // Your building's cps
		Cppkies.DEFAULT_ONBUY, // The function to call when your building gets bought but don't worry about this
		{
			name: "Normal Baker",
			desc: "The top of your cookie hierarchy",
			icon: [2, 0],
		}, // Your building's data on business day
		["Motivation!", "Distractions"] // Your building's building buff and building debuff
	)
})
```

Now you have the code (or just copied the code above), It's time to draw your art. When creating art for your building, the normal icons must be 48x48(24x24 upscaled to \*2) and [must be in a specific order, if not, you must use `relinkColumn`](/CommonProblems#IconOrder), big icons must be 64x64. Here's are simple templates to follow:
![Building Big Icon Template](./static/BuildingTemplate.png?raw=true) <!--todo: draw this template-->

In words this template is as follows, your building when unlocked, your building when locked, your building when unlocked when it's business day and finally your building when it's locked when it's business day.

## Extras

Adding tiered upgrades/achievements to your building is rather simple just follow the guide below, Tier numbers can be found on the Cookie Clicker Wiki [here](https://cookieclicker.fandom.com/wiki/Upgrades#Tiers)

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building()
	/* Your Buildings data */
	new Cppkies.TieredUpgrade(
		"Keyboard Toppings", // The name of the upgrade.
		"Cherry Switches can be used as a replacement for cherries, right? I guess it doesn't really matter, <b>everyone</b> loves clacky keys.", // Your upgrade's quote.
		"Cppkie Baker", // The building your upgrade is boosting.
		"1" // Your upgrade's tier in this case, the 1st normal tier, Plain
	)
	/* ... */
	new Cppkies.TieredUpgrade(
		"Multi Finger Addition Surgery",
		"Increases your cps by about 128 clicks. MFAS for short, we do lung extensions as well if you're interested.",
		"Cppkie Baker",
		"13" // The 13th normal tier, Iridyum
	)
	new Cppkies.TieredAchievement(
		"Cahpuhkies",
		"An inferior version your Cppkies (Look there isn't really a pronunciation.)",
		"13", // The 13th normal tier, Iridyum
		"Cppkie Baker"
	)

	// Non-tier upgrades

	// Grandma synergies
	new Cppkies.GrandmaSynergy(
		"Sleepy Grandmas",
		"A nice ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ to ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ you cookies",
		"Cppkie Baker",
		`${prefix}/cppkieGrandma.png`
	)

	// Production achievements (Make _ cookies from only _)

	new Cppkies.ProductionAchievement(
		"Pls",
		"Cppkie baker",
		1 // The tier of the production achievement, unrelated to game tiers, works without modifications for 1 2 and 3
	)

	new Cppkies.ProductionAchievement(
		"Update",
		"Cppkie baker",
		2,
		"This" // The flavor text of it
	)

	new Cppkies.ProductionAchievement(
		"Quickly",
		"Cppkie baker",
		3,
		null, // No flavor text here
		3 // Additional multiplier for the requirement (Will up the normal req for this by 10^3)
	)
})
```

 <!-- Todo: Lvl10 cheevos, auras -->
