# Creating a Tier

Tiers are a simple collection of Upgrades in a predictable order. These are typically unlocked after unlocking a certain number of buildings but it is not necessary. It is rather simple to create a tier and I will show you the steps below:

If you have been following the tutorials then this is what your mod should look like so far:

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		/* Your Buildings data */
	)
})
```

If you've followed the extra part of that tutorial, your code May look like this : 

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	new Cppkies.Building(
		/* Your Buildings data */
	)
	new Cppkies.TieredUpgrade(
		"Keyboards", // The name of the upgrade.
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
})
```

So regardless of what your code looks like you will have to first add your tier into the game, like so: 

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	/* Previous Code */
	
	new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier. 
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
	)
})
```

After adding the name and color of your Tier you will have to add some additional information : 
```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	/* Previous Code */
	
	new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier. 
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
		1, // The base price of your tier in cookies, can be "auto" if you don't want to define it directly. 
		true, // Can your tier be unlocked by normal means?
		10, // How many Buildings you need to own to unlock the upgrade. 
		10, // How many Buildings you need to own to unlock the achievement.
		"Random Upgrade", // The name of a upgrade needed to unlock the upgrades in this tiers, can be null if none is needed
		"auto" // Optional, What your tier is called internally, if "auto" it is automatic
	)
})
```

Creating a new upgrade / achievement within your tier is rather simple : 

```ts
import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
	Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
	Cppkies.iconLink = `${prefix}/buildingIcons.png`
	/* Previous Code */
	
	new Cppkies.Tier(
		"Modded", // The name of your tier.
		[0, 0], // The position of any icon within your tier. 
		"#ff89e7" // The color of the text that shows up on your tier's upgrades after you buy the "Label Printer" heavenly upgrade.
		1, // The base price of your tier in cookies, can be "auto" if you don't want to define it directly. 
		true, // Can your tier be unlocked by normal means?
		10, // How many Buildings you need to own to unlock the upgrade. 
		10, // How many Buildings you need to own to unlock the achievement.
		"Random Upgrade", // The name of a upgrade needed to unlock the upgrades in this tiers, can be null if none is needed
		"Modded" // Optional, What your tier is called internally, if "auto" it is automatic
	)
	
	new Cppkies.TieredUpgrade(
		"Spiced Motherboards",
		"A little sugar and spice make everything nice. Just watch out for bugs, they love sugar.",
		"Cppkie Baker", 
		"Modded" // Your custom tier's name
	)
	
	new Cppkies.TieredAchievement(
		"Cphpkies",
		"A double-clawed hammer-beast formed from your bad practices and errors.",
		"Modded", // Your custom tier's name
		"Cppkie Baker"
	)
})
```

