# Upgrade

Upgrades are items that can be bought in the store, in the rightmost panel of the game.

On their own, upgrades do nothing; they only record whether they are unlocked/bought or not. You need to write the code to unlock upgrades and modify gameplay somewhere else, calling `Game.Unlock` to unlock upgrades, and `Game.Has` to check whether an upgrade was bought.

Upgrades are classes, so they must be initialized with the `new` keyword.

Cppkies will automatically save whether the upgrade was unlocked/bought or not, so you don't have to manage this. This data is recorded to your save file's mod data.

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

Heavenly upgrades are drastically different and are located on [a different page](types/HeavenlyUpgrade.md).

### Tiered Upgrade

Tiered upgrades are upgrades which multiply the production of a building by 2, they are automatically unlocked at a multiple of 50 of the building. (Except for cursors)

#### Constructor properties

1. `name` - `string` The name of the tiered upgrade
2. `description` - `string` The quote (flavor text) of the upgrade
3. `building` - `string |`[`Game.Object`](types/Building.md) The building it boosts
4. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.

#### Example

```ts
new Cppkies.TieredUpgrade(
	"Longer rolling pins",
	"Some quote here I don't know",
	"Grandma",
	"13" // The 13th normal tier, Iridyum
)
```

### Cursor Upgrade

Cursor upgrades are upgrades which multiply the bonus from Thousand fingers. They are automatically unlocked at a multiple of 50 of cursors.

#### Constructor properties

1. `name` - `string` The name of the upgrade
2. `quote` - `string` The quote (flavour text) of it
3. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
4. `power` - `number` The multiplier of of thousand fingers, if omitted, 20 by default, which is the multiplier of later cursor upgrades

#### Example

```ts
new Cppkies.CursorUpgrade("A lot of fingers", "click * 100", 13, 500)
```

### Kitten Upgrade

Kitten upgrades are upgrades which multiply CpS based on achievement amount. They are automatically unlocked when a new milk is unlocked.

#### Constructor properties

1. `name` - `string` Name of the upgrade
2. `quote` - `string` The quote (flavour text) of it
3. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
4. `power` - `number` The multiplier of CpS per 25 achievement, if not set, automatically calculated
5. `cost` - `number` The cost of the upgrade, if not set, automatically calculated
6. `milkUnlockAmount` - `number` The milk progess (`achievements / 25`) required to unlock the upgrade, if not set, automatically calculated

#### Example

```ts
new Cppkies.KittenUpgrade(
	"Kitten example upgrade help can someone help me with this name please",
	"some flavour text please I have no idea help",
	7 // Jetmint tier
)
```

### Mouse Upgrade

Mouse upgrades are upgrades which add more cookies per click to the cursor. They are automatically unlocked after enough hand-made cookies have been made.

#### Constructor properties

1. `name` - `string` The name of the upgrade
2. `quote` - `string` The quote (flavour text) of it
3. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
4. `power` - `number` The multiplier of CpS per click, `0.01` by default, which is what all other cursor upgrades give

#### Example

```ts
new Cppkies.MouseUpgrade("Omegaepic mouse", "Epic!", 13, 10)
```

### Cookie Upgrade

Upgrade cookies are upgrades which multiply the amount of cookies gained per second, and automatically unlocked at a certail treshold.

#### Constructor properties

1. `name` - `string` Name of the cookie
2. `quote` - `string` Quote (flavour text) of it
3. `price` - `number` The price of the cookie
4. `icon` - [`Icon`](types/Icon.md) The icon of it
5. `power` - `number` The multiplier of CpS, in %, so `5` means +5% CpS, etc.
6. `req` - `{ require?: string; season?: string; locked?: boolean }` Some optional conditions, etc. the season, the upgrade required, or if the upgrade can be unlocked naturally at all to unlock this
   (Note: All cookies which aren't locked _require_ you to have 1/20 of it's cost to be unlocked)
7. `order` - `number` Position of the cookie in the list, Most cookies have 10020 by default, cookies from boxes and special cookies have different orders.

#### Example

```ts
new Cppkies.CookieUpgrade(
	"Cursor cookie",
	"Tastes like nostalgia",
	1e40,
	[0, 0],
	{ season: "fools" },
	100000
)
```

### Synergy Upgrade

Synergy upgrades are upgrades which boosts two buildings at once, proportionate to the amount of the other building. Synergy upgrades are automatically unlocked at the tier's unlock number.

#### Constructor properties

1. `name` - `string` The name for the upgrade
2. `quote` - `string` The flavor text for it
3. `building1` - `string |`[`Game.Object`](types/Building.md) The first building
4. `building2` - `string |`[`Game.Object`](types/Building.md) The second building
5. `tier` - `string | number` The upgrade's tier, is the id of the tier, ex. `synergy1`(Synergy I), `synergy2`(Synergy II), etc. **Warning: The tier must have a req field**

#### Example

```ts
new Cppkies.CookieUpgrade(
	"Grandma sisters",
	"A nice grandma to help other grandmas",
	"Grandma",
	"Grandma",
	"synergy2"
)
```

### Grandma Synergy Upgrade

Grandma synergy upgrades are upgrades which boost both grandmas and another building. They are automatically unlocked at 15 of the building. (Note: doesn't really work with Cursors and Grandmas as second building)

#### Constructor properties

1. `name` - `string` The name for the upgrade(Usually something like "\_ Grandmas")
2. `quote` - `string` The flavor text of the upgrade
3. `building` - `string |`[`Game.Object`](types/Building.md) The building to be tied with
4. `grandmaPicture` - `string` Optional, the picture of the grandma to use in grandma art when bought

#### Example

```ts
new Cppkies.GrandmaSynergy(
	"Grandma grandma",
	"A nice grandma to grandma more grandmas",
	"Time machine",
	"img/grandma.png"
)
```
