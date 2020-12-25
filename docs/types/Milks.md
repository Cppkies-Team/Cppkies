# Milk

Milks are visual indications of the amount of achievements got. Cppkies can add milks.

## Constructor Parameters

1. `name` - `string` The name of the milk
2. `icon` - [`Icon`](types/Icon.md) The icon of the milk
3. `pic` - `string` The image to use for the milk itself, must end in .png
4. `special` - `boolean` Optional, if true, the milk is only avaliable via milk selector (NOT IMPLEMENTED)

## Example

```ts
new Cppkies.Milk(
	"Rainbow milk!",
	[0, 0, "https://pipe.miroware.io/5fb27f0be6bde66c95ca6ca3/temp.png"],
	"https://pipe.miroware.io/5fb27f0be6bde66c95ca6ca3/temp2.png"
)
```
