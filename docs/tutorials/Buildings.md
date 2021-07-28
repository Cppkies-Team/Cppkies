# Creating a Building

Buildings are the main way you make cookies in Cookie Clicker, and this is an tutorial to make one.

## Getting started

If you are coming from the setup tutorial this is what your mod should look like so far:

<!-- tabs:start -->

### **NPM**

```ts
import { onLoad } from "cppkies"
onLoad.push(() => {})
```

### **loadMod**

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {})
```

<!-- tabs:end -->

## Using the Mod API

First of all, the [Mod](types/Mod.md) API should be used to prevent multiple loads and enable some features.

<!-- tabs:start -->
### **NPM**

```ts
import { Mod } from "cppkies"
new Mod({
	keyname: "building-mod", // Change this to something different
	version: "1.0.0" // Change this number each time you mod updates
}, () => {
	// ...
})
```

> [!NOTE]
> Note that, unlike `loadMod`, this method of loading mods does not require waiting for Cppkies to completely load to do anything. Since `Mod`s automatically wait until Cppkies has finished loading, you don't have to worry about your mod breaking because hooks haven't finished loading yet.

### **loadMod**

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	new Cppkies.Mod({
		keyname: "building-mod", // Change this to something different
		version: "1.0.0" // Change this number each time you mod updates
	}, () => {
		// ...
	})
})
```

<!-- tabs:end -->

## Linking the art

The first step you'll need to follow is to tell Cppkies where your art for your building is.

The `buildingLink` and `iconLink` properties automatically set the default custom icon link to itself, making it less tedious to reference icons from the same custom iconsheet multiple times.

<!-- tabs:start -->

### **NPM**

```ts
import { miscValues, Mod } from "cppkies"
const prefix = "https://example.com/CppkieBaker/static" // A link to your building's art.
new Mod({
	keyname: "building-mod",
	version: "1.0.0"
}, () => {
	miscValues.buildingLink = `${prefix}/buildingBigIcon.png` // Building big icons
	miscValues.iconLink = `${prefix}/buildingIcons.png` // Building normal icons
})
```

### **loadMod**

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	const prefix = "https://example.com/CppkieBaker/static" // A link to your building's art.
	new Cppkies.Mod({
		keyname: "building-mod", // Change this to something different
		version: "1.0.0" // Change this number each time you mod updates
	}, () => {
		Cppkies.miscValues.buildingLink = `${prefix}/buildingBigIcon.png` // Building big icons
		Cppkies.miscValues.iconLink = `${prefix}/buildingIcons.png` // Building normal icons
	})
})
```

<!-- tabs:end -->

## Adding the string data

We'll start filling in the [Building](types/Buildings.md) parameters, starting with the main strings.

<!-- tabs:start -->

### **NPM**

```ts
import { miscValues, Mod, Building } from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
new Mod({
	keyname: "building-mod",
	version: "1.0.0"
}, () => {
	miscValues.buildingLink = `${prefix}/buildingBigIcon.png`
	miscValues.iconLink = `${prefix}/buildingIcons.png`
	new Building(
		"Cppkie Baker", // The Name of your building
		"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
		"Generates cookies by baking them, why did nobody think about this?" // How your building generates cookies
	)
})
```

### **loadMod**

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	const prefix = "https://example.com/CppkieBaker/static"
	new Cppkies.Mod({
		keyname: "building-mod",
		version: "1.0.0"
	}, () => {
		Cppkies.miscValues.buildingLink = `${prefix}/buildingBigIcon.png`
		Cppkies.miscValues.iconLink = `${prefix}/buildingIcons.png`
		new Cppkies.Building(
			"Cppkie Baker", // The Name of your building
			"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
			"Generates cookies by baking them, why did nobody think about this?" // How your building generates cookies
		)
	})
})
```

<!-- tabs:end -->

## Adding the art data

These lines add the art data for your building.

From this point all, we will only show the `Building` construction, since that is all that is changing.

```ts
new Cppkies.Building(
	"Cppkie Baker",
	"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
	"Generates cookies by baking them, why did nobody think about this?",
	[0, 0], // The coords for the default icon for your building
	[0, 0], // The coords for the default big icon for your building
	{
		bg: `${prefix}/buildingBg.png`, // The background for your building on the building screen
		pic: `${prefix}/buildingBake.png`, // The actual building pic on the building screen
		xV: 16, // The amount your building can move left and right on the building screen in pixels
		yV: 64, // The amount your building can move up and down on the building screen in pixels
	}
)
```

## Adding the numbers

And these lines are the numbers data for your building such as CpS and the On-buy unlocks.


<!-- tabs:start -->

### **NPM**

```ts
import { miscValues, Mod, Building, DEFAULT_CPS, DEFAULT_ONBUY } from "cppkies"

// ...

new Building(
	"Cppkie Baker",
	"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
	"Generates cookies by baking them, why did nobody think about this?",
	[0, 0],
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
```
### **loadMod**

```ts
new Cppkies.Building(
	"Cppkie Baker",
	"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
	"Generates cookies by baking them, why did nobody think about this?",
	[0, 0],
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
```

<!-- tabs:end -->

## Misc. additions

The final touches to your building.

```ts
new Cppkies.Building(
	"Cppkie Baker",
	"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
	"Generates cookies by baking them, why did nobody think about this?",
	[0, 0],
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
```

## The end

If you finished these steps then you should have yourself all the code needed for a new building. For a recap here is all the code commented for your convenience.

<!-- tabs:start -->

### **NPM**

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
new Mod({
	keyname: "building-mod",
	version: "1.0.0"
}, () => {
	miscValues.buildingLink = `${prefix}/buildingBigIcon.png`
	miscValues.iconLink = `${prefix}/buildingIcons.png`
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

### **loadMod**

```js
Game.LoadMod("https://unpkg.com/cppkies@0.3")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
	const prefix = "https://example.com/CppkieBaker/static"
	new Cppkies.Mod({
		keyname: "building-mod",
		version: "1.0.0"
	}, () => {
		Cppkies.miscValues.buildingLink = `${prefix}/buildingBigIcon.png`
		Cppkies.miscValues.iconLink = `${prefix}/buildingIcons.png`
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
})
```

<!-- tabs:end -->

Now you have the code (or just copied the code above), It's time to draw your art. When creating art for your building, the normal icons must be 48x48(24x24 upscaled to \*2) and [must be in a specific order, if not, you must use `relinkColumn`](/CommonProblems#IconOrder), big icons must be 64x64. Here's are simple templates to follow:
![Building Big Icon Template](./static/BuildingTemplate.png?raw=true)

In words this template is as follows, your building when unlocked, your building when locked, your building when unlocked when it's business day and finally your building when it's locked when it's business day.

## Upgrades

The following code shows how to add upgrades which relate to the building, such as tiered upgrades and multiple synergy upgrades.

```ts
// Tiered upgrades
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
// Grandma synergy
new Cppkies.GrandmaSynergy(
		"Sleepy Grandmas",
		"A nice ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ to ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ you cookies",
		"Cppkie Baker",
		`${prefix}/cppkieGrandma.png`
)
// Synergies
new Cppkies.SynergyUpgrade(
	"Calculated temperatures",
	"Calculate the optimal temperatures to bake the cookies at.",
	"Cppkie Baker",
	"Javascript Console",
	"synergy1"
)
new Cppkies.SynergyUpgrade(
	"Baking light",
	"Prisms light the oven, so you can see the Cppkies baking, neat!",
	"Cppkie Baker",
	"Prism",
	"synergy2"
)
```

## Achievements

The following code shows how to add achievement which relate to the building, such as tiered achievements and production achievements.

```ts
// Tiered achievements
/* ... */
new Cppkies.TieredAchievement(
	"Cahpuhkies",
	"An inferior version your Cppkies (Look there isn't really a pronunciation.)",
	"13", // The 13th normal tier, Iridyum
	"Cppkie Baker"
)
// Production achievements (Make _ cookies from only _)

new Cppkies.ProductionAchievement(
	"How did he write 518 of these things.",
	"Cppkie Baker",
	1 // The tier of the production achievement, unrelated to game tiers, works without modifications for 1 2 and 3
)

new Cppkies.ProductionAchievement(
	"Like seriously it's kinda crazy, I'm really running out of ideas and references.",
	"Cppkie Baker",
	2,
	"This" // The flavor text of it
)

new Cppkies.ProductionAchievement(
	"Good job, Orteil.",
	"Cppkie Baker",
	3,
	null, // No flavor text here
	3 // Additional multiplier for the requirement (Will up the normal req for this by 10^3)
)

new Cppkies.Level10Achievement(
	"Open Source",
	"Cppkie Baker",
	'<a href="https://github.com/Cppkies-Team/Cppkies">https://github.com/Cppkies-Team/Cppkies</a><br/>...Is that even clickable?'
)
```
## Dragon

The code below shows how to add the aura and level for the dragon to be able to unlock that aura after sacrificing the building.
Note that using the aura does nothing by default and has to be manually implemented, `Game.auraMult` should be used to get the aura multiplier.

```ts
new Cppkies.DragonAura(
	"Dragon's Will", 
	"Grants positive buffs every minute.",
	"Cppkie Baker"
)

new Cppkies.DragonAuraLevel(
	"Dragon's Will", 
	"Grants you a random positive buff <b>every minute</b>. You can only have one buff active at once.", // Just a note here, Reality Bending would not be given the one buff active at once, if someone ever were to implement this
	"Cppkie Baker"
)
```
