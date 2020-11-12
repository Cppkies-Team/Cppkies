# Upgrade

Upgrades are items than can be bought for cookies and they modify the production of cookies.

Upgrades are classes, so they must be initialized with the `new` keyword.

By default, upgrades are never unlocked and do nothing.

## Example

```ts
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

### Tiered Upgrade

1. `name` - `string` The name of the tiered upgrade
2. `description` - `string` The quote (flavor text) of the upgrade
3. `building` - `string |`[`Game.Object`](./Building.md) The building it boosts
4. `tier` - `string | number` The upgrade's tier

#### Example

```ts
new Cppkies.TieredUpgrade(
	"Stacked cursors",
	"Never synchronized with eachover",
	"Cursor",
	"7"
)
```

### Heavenly Upgrade

1. `name` - `string` The name for the heavenly upgrade
2. `desc` The description of the heavenly upgrade
3. `price` - The price of the heavenly upgrade (in Heavenly Chips)
4. `icon` - [`Icon`](./Icon.md) The icon for the heavenly upgrade
5. `position` - `[number, number]` The position of it on the heavenly map screen
6. `parents` - `(number | string)[]` The heavenly upgrade's parents, can be mixed ID's with names
7. `buyFunc` - `() => void` The function which gets called on being bought

#### Example

```ts
new Cppkies.HeavenlyUpgrade(
	"Heavenly uselessness",
	"Does absolutely <b>nothing</b>.",
	123,
	[1, 7]
)
```
