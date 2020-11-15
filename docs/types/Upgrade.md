# Upgrade

Upgrades are items that can be bought in the store, in the rightmost panel of the game.

On their own, upgrades do nothing; they only record whether they are unlocked/bought or not. You need to write the code to unlock upgrades and modify gameplay somewhere else, calling `Game.Unlock` to unlock upgrades, and `Game.Has` to check whether an upgrade was bought.

Cppkies will automatically save whether the upgrade was unlocked/bought or not, so you don't have to manage this. This data is recorded to your save file's mod data.

## Example

```js
new Cppkies.Upgrade(
	"Useless upgrade",
	"Does <b>nothing</b><q>Nice one!</q>",
	10,
	[1, 7]
)
```

## Constructor properties

1. `name` - `string | (() => string)` The name of the upgrade, can also be a function
2. `desc` - `string | (() => string)` The description of the upgrade, can also be a function
3. `price` - `number | (() => number)` The price of the upgrade in cookies, can also be a function
4. `icon` - [`Icon`](types/Icon.md)`| (() =>`[`Icon`](types/Icon.md)`)`The icon for it
5. `buyFunc` - `() => void` The function that gets called when you buy the upgrade

## Extensions

There are different sub-types of upgrades which have automatically generated parameters such as `order`, `desc`, unlock conditions, etc.

Heavenly upgrades are drastically different and are located on [a different page](types/HeavenlyUpgrade.md).

### Tiered Upgrade

Tiered upgrades are upgrades which multiply the production of a building by 2, they are automatically unlocked at a multiple of 50 of the building.

1. `name` - `string` The name of the tiered upgrade
2. `description` - `string` The quote (flavor text) of the upgrade
3. `building` - `string |`[`Game.Object`](types/Building.md) The building it boosts
4. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.

#### Example

```js
new Cppkies.TieredUpgrade(
	"Stacked cursors",
	"Some quote here I don't know",
	"Cursor",
	"7" // The 7th normal tier, Jetmint
)
```

<!--TODO: CursorUpgrade, MouseUpgrade, KittenUpgrade-->

