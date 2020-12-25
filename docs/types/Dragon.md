# Dragon levels and auras

Dragon, also knows as Krumblor, yadda yadda yadda

## Dragon levels

Dragon levels are the core idea of the dragon, which allows the dragon to be upgraded, for a price.

Cppkies allows easy creation of dragon levels, and automatically stores all level data.

### Constructor properties

1. `name` - `string | null` Name of the dragon at this level, `null` for last name
2. `desc` - `string` A string describing the effects of leveling up
3. `costDescription` - `string | (() => string)` A string (or a function) describing the resources required to be able to buy the level
4. `canBuy` - `() => boolean` A function which determines if it is possible to buy the level
5. `buy` - `() => void` A function which spends the required resources
6. `icon` - [`Icon`](types/Icon.md) Icon of the dragon at this level, `null` (or not supplied) for last icon, note that the icon is 96x96, not 48x48
7. `order` - `number` The position of the level relative to other levels, `null` (or not supplied) for right before dragon cookie.

### Example

```ts
new Cppkies.DragonLevel(
	"Half-shivering dragon egg",
	"Chip it..?",
	() => `${Beautify(6000000)} cookies`,
	() => Game.cookies >= 6000000,
	() => Game.Spend(6000000),
	[3, 0],
	3
)
```

### Dragon aura level

Dragon aura levels are levels which unlock auras, they have a simplified amount of properties to be passed to.

#### Constructor properties

1. `auraName` - `string` Name of the aura
2. `auraDesc` - `string` A short description of the aura, doesn't have to use the normal one
3. `building` - `string |`[`Game.Object`](types/Building.md) The building to associate the aura level with.

#### Example

```ts
new Cppkies.DragonAuraLevel(
	"Better Epoch Manipulator lol",
	"Golden cookies effects last 10% longer",
	"Time machine"
)
```

## Dragon aura

Dragon auras are the main use for the dragon. Cppkies can easily create and manage auras.

### Constructor properties

1. `name` - `string` Name of the dragon aura (in HTML text)
2. `desc` - `string` Description of it (in HTML text)

(non-building)

3. `icon` - [`Icon`](types/Icon.md) The icon of it

OR
(building)

3. `building` - `string |`[`Game.Object`](types/Building.md) The building to associate the aura with

### Example

```ts
new Cppkies.DragonAura(
	"Better Epoch Manipulator lol",
	"Golden cookies effects last <b>10%</b> longer.",
	"Time machine"
)

new Cppkies.DragonAura(
	"Dragon insight",
	"Research is done <b>30%</b> faster.",
	[9, 25]
)
```
