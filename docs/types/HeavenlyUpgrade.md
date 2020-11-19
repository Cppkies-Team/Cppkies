# Heavenly Upgrade

Heavenly upgrades are items which can be seen and bought only after ascending.

On their own, heavenly upgrades do nothing; hey only record whether they are unlocked/bought or not. You need to write the code to modify gameplay somewhere else, and call `Game.Has` to check whether the heavenly upgrade was bought.

## Constructor properties

1. `name` - `string` The name for the heavenly upgrade
2. `desc` The description of the heavenly upgrade
3. `price` - The price of the heavenly upgrade (in Heavenly Chips)
4. `icon` - [`Icon`](types/Icon.md) The icon for the heavenly upgrade
5. `position` - `[number, number]` The position of it on the heavenly map screen
6. `parents` - `(number | string)[]` The heavenly upgrade's parents, can be mixed ID's with names
7. `buyFunc` - `() => void` The function which gets called on being bought

```js
new Cppkies.HeavenlyUpgrade(
	"Heavenly uselessness",
	"Does absolutely <b>nothing</b>.",
	123,
	[1, 7],
	[6, -197], // The position of the upgrade, right above Legacy
	["Legacy"]
)
```

<!--TODO: PseudoCookieUpgrade, `showIf` -->
