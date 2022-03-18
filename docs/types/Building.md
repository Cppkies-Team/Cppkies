# Buildings

Buildings are the main way you make cookies in Cookie Clicker, in the original API, buildings are called objects, which can be confused with the builtin `Object` wrapper class.

Buildings are classes, so they must be initialized with the `new` keyword.

## Constructor properties

1. `name` - `string` The name of the building.
2. `commonName` - `string` Other strings that will be used in the building, split by `|`, in the order:

   - The name of your building
   - The name of the building in plural
   - Sugar lump boost
   - Sugar lump boost in plural

3. `desc` - `string` The description of the building
4. `icon` - [`Icon`](types/Icon.md) The small icon that shown up in the tooltip
5. `bigIcon` - [`Icon`](types/Icon.md) The big icon that shows up in the store
6. `art` - [`Art`](types/Art.md) The art to be used for the row picture
7. `cpsFunc` - `(me: Building) => number` The function to calculate the CPS for the building(usually calculating the multiplier), most of the time it's best to use `DEFAULT_CPS`
8. `onBuy` - `() => void` The function which gets called when it's bought, usually used to unlock upgrades, most of the time it's best to use `DEFAULT_ONBUY`
9. `foolBuilding` - [`FoolBuilding`](types/FoolBuilding.md) The building during Business day
10. `buildingSpecial` - `[string, string]` The building special and building debuff

## Example

```ts
new Cppkies.Building(
	"Cppkie Baker",
	"cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
	"Generates cookies by baking them, why did nobody think about this?",
	[0, 0],
	[0, 0],
	{
		bg: `https://example.com/buildingBg.png`,
		pic: `https://example.com/buildingBake.png`,
		yV: 64,
		xV: 16,
	},
	Cppkies.DEFAULT_CPS,
	Cppkies.DEFAULT_ONBUY,
	{
		name: "Normal Baker",
		desc: "The top of your cookie hierarchy",
		icon: [1, 0],
	},
	["Motivation!", "Distractions"]
)
```
