# Art

The Art type allow to specify how exactly render the building in the middle row

## Type

```ts
interface Art {
	base?: string
	xV?: number
	yV?: number
	w?: number
	rows?: number
	x?: number
	y?: number
	pic?: string
	bg?: string
}
```

- `pic` - `string` The building picture, overridden by `base`
- `bg` - `string` The render background, overridden by `base`
- `base` - `string` The prefix for automatically getting the background and building picture, overrides `bg` and `pic`, background will be `<Prefix>Background.png` and building will be `<Prefix>.png`
- `xV` - `number` The number of pixels to randomly shift by X
- `yV` - `number` The number of pixels to randomly shift by Y
- `w` - `number` The width of the building picture
- `rows` - `number` How many rows should the render have
- `x` - `number` The starting X of the building
- `y` - `number` The starting Y of the building

<!--
  - `h` - `number` The building height
	- `frames` - `number` - Split `pic` to `frame` pictures, and picks any `pic` to use
-->
