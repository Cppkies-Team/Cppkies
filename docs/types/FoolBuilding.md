# FoolObject

The fool object interface allows to customize how the building would look while business day season is active.

## Type

```ts
interface FoolBuilding {
	name: string
	desc: string
	icon: Icon
}
```

### Properties

- `name` - `string` The name of the building
- `desc` - `string` The description of the building
- `icon` - [`Icon`](types/Icon.md) The icon of the building
