# Creating a Tier

Tiers are a simple collection of Upgrades in a predictable order. These are typically unlocked after unlocking a certain number of buildings but it is not necessary. It is rather simple to create a tier and I will show you the steps below:

If you are coming from the setup tutorial this is what your mod should look like so far:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {})
```

The first step you'll need to follow is to tell Cppkies where your art for your tier is.

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/ModdedTier/static" // A link to your building's art.
Cppkies.onLoad.push(() => {
	Cppkies.iconLink = `${prefix}/tierIcons.png` // Building normal icons
})
```

If you've followed [the extra part of the building tutorial](tutorials/Buildings.md?id=Extras), your code may look like this:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	/* Building stuff data */
	new Cppkies.TieredUpgrade(
		"Keyboards",
		"Cherry Switches can be used as a replacement for cherries, right? I guess it doesn't really matter, <b>everyone</b> loves clacky keys.",
		"Cppkie Baker",
		"1"
	)
	/* ... */
	new Cppkies.TieredUpgrade(
		"Multi Finger Addition Surgery",
		"Increases your cps by about 128 clicks. MFAS for short, we do lung extensions as well if you're interested.",
		"Cppkie Baker",
		"13"
	)
	new Cppkies.TieredAchievement(
		"Cahpuhkies",
		"An inferior version your Cppkies (Look there isn't really a pronunciation.)",
		"13", // The 13th normal tier, Iridyum
		"Cppkie Baker"
	)
})
```

So regardless of what your code looks like you will have to first add your tier into the game, like so:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/ModdedTier/static"
Cppkies.onLoad.push(() => {
	Cppkies.iconLink = `${prefix}/tierIcons.png`
	/* Previous Code */

	new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier.
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
	)
})
```

After adding the name and color of your tier you can, optionally, enter more parameters:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/ModdedTier/static"
Cppkies.onLoad.push(() => {
	Cppkies.iconLink = `${prefix}/tierIcons.png`
	/* Previous Code */

	new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier.
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
		1, // The base price of your tier in cookies, can be "auto" if you don't want to define it directly.
		true, // Is your tier special? (Not available via getting an amount of buildings, etc.)
		10, // How many Buildings you need to own to unlock the upgrade, can be "auto" if you don't want to define it directly.
		10, // How many Buildings you need to own to unlock the achievement, can be "auto" if you don't want to define it directly.
		"Random Upgrade", // The name of a upgrade needed to unlock the upgrades in this tiers, can be null if none is needed
		"auto" // Optional, What your tier is called internally, if "auto" it is automatic
	)
})
```

Creating a new upgrade or achievement within your tier is rather simple:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/ModdedTier/static"
Cppkies.onLoad.push(() => {
	Cppkies.iconLink = `${prefix}/tierIcons.png`
	/* Previous Code */

	const moddedTier = new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier.
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
	).keyName

	// Do note that you usually want `Cppkies.CursorUpgrade` for cursor upgrades!
	new Cppkies.CursorUpgrade(
		"Decillion fingers",
		"Some flavour text here idk",
		moddedTier // Normal tiers have numbered tier names, so it's easier to use it like this
	)

	new Cppkies.TieredUpgrade(
		"Somebody please come up with this",
		"This is seriously temporary pls I am calling out for help",
		"Grandma",
		moddedTier
	)

	// Fun fact: You can also use these classes with custom buildings, so, if you have the building from the building guide...

	new Cppkies.TieredAchievement(
		"Cphpkies",
		"A double-clawed hammer-beast formed from your bad practices and errors.",
		"Cppkie Baker",
		moddedTier
	)

	// Non-building upgrades

	new Cppkies.KittenUpgrade(
		"Kitten upgrade thing help can someone help me with this name please",
		"some flavour text please I have no idea help",
		moddedTier
	)

	new Cppkies.MouseUpgrade(
		"Cppkium mouse",
		"editors! please come up with something I beg you",
		moddedTier
	)
})
```
