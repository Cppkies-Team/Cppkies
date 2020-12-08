# Achievement

Achievements are items that are given when an objective is completed.

On their own, achievements are never unlocked; they only record whether they are won or not. You need to write the code to win the achievement itself.

Achievements are classes, so they must be initialized with the `new` keyword.

Cppkies will automatically save whether the achievement was won or not, so you don't have to manage this. This data is recorded to your save file's mod data.

## Example

```js
new Cppkies.Achievement(
	"Unachievable achievement",
	"It's <b>impossible</b> to get this achievement.<q>Nice one!</q>",
	[1, 7]
)
```

## Constructor properties

1. `name` - `string` The name of the achievement
2. `desc` - `string` The description of the achievement
3. `icon` - [`Icon`](types/Icon.md) The icon for it

## Extensions

There are different sub-types of achievements which have automatically generated parameters such as `order`, `desc`, win conditions, etc.

### Bank, CpS Achievements

Bank and CpS achievements are achievement which are rewarded for reaching a certain amount of cookies this ascension or per second. They are similar code-wise so they are bundled together.

#### Constructor properties

1. `name` - `string` The name of the achievement
2. `icon` - [`Icon`](types/Icon.md) The icon for it
3. `quote` - `string | null` The optional quote of it
4. `treshold` - `number` The amount of cookies required, if not set, automatically calculated (`10 ** Math.floor(Game.BankAchievements.length * 1.5 + 2)` for bank achievements, `10 ** Math.floor(Game.BankAchievements.length * 1.2)` for CpS achievements)

#### Example

```js
new Cppkies.BankAchievement("Bank name", [1, 7], "Eh?")
new Cppkies.CpSAchievement("CpS name", [1, 7], "Hmm")
```

### Tiered Achievements

Tiered achievements are achievements which are rewarded for reaching a certain amount of buildings.

#### Constructor properties

1. `name` - `string` The name of it
2. `quote` - `string | null` The optional quote of it
3. `tier` - `string | number | "cursor2" | "cursor50"` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), etc. (Can be "cursor2" or "cursor50" for special cursor amounts)
4. `building` - `string |`[`Game.Object`](types/Building.md) The building linked to this achievement

#### Example

```js
new Cppkies.TieredAchievement("Ok zoomer", null, "Grandma", 13)
```

<!-- TODO: LevelAchievement, ProductionAchievement, ClickAchievement, etc-->
