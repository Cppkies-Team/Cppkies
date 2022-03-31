# Spirit

Spririts (also known as Gods, in-game) are the main part of the Pantheon minigame.

By default, a slotted spirit doesn't do anything, all effects have to be implemented manually.

Spritis are classes, so they must be initialized with the `new` keyword.

Cppkies automatically saves whenether there are any custom spirits currently slotted, if so, it modifies the saved pantheon data, so that the game doesn't break if the mod which supplied the spirit is not loaded on game load.

## Spirit descriptions

Spirits have a lot of description fields; Cppkies has an interface to easily describe all of them.

```ts
interface SpiritDescriptions {
	1?: string
	2?: string
	3?: string
	before?: string
	after?: string
	active?: () => string // Only shown when the spirit is active.
}
```

## Constructor properties

1. `spiritName` - `string` The name of the spirit
2. `spiritTitle` - `string` The title of the spirit, e.g.: "Godzamok, Spirit of destruction" - `spiritName` is "Godzamok", `spiritTitle` is "destruction"
3. `icon` - [`Icon`](types/Icon.md) The icon of the spirit
4. `descriptions` - [`SpiritDescriptions`](#spirit-descriptions) The descriptions for the spirit.
5. `quote` - `string?` The quote (flavour text) for the spirit.
6. `fullName` - `string?` The compiled name of the spirit, "`spiritName`, Spirit of `spiritTitle`" by default

## Example

```ts
new Cppkies.Spirit("living thing", "beasts", [0, 0], {
	1: '<span class="green">Krumblor\'s auras are 50% stronger.</span> <span class="red">Buildings grant -25% CpS.</span>',
	2: '<span class="green">Krumblor\'s auras are 25% stronger.</span> <span class="red">Buildings grant -15% CpS.</span>',
	3: '<span class="green">Krumblor\'s auras are 10% stronger.</span> <span class="red">Buildings grant -9% CpS.</span>',"uwu or something"
})
```
