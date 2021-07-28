# Mod

Cppkies mods are a way to store custom mod data and add custom options to the options menu. Mods also automatically wait for the mod hooks to finish being setup.

## Metadata

Mods have some identifying metadata, which aligns with the required properties to qualify for [Cppkies Mod Repository](CCRepo.md).

```ts
interface ModMetadata {
	/**
	 * The unique keyname of the mod, can consist of
	 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
	 */
	keyname: string
	/**
	 * The shown name of the mod, doesn't contain any restrictions
	 */
	name?: string
	/**
	 * The icon of the mod
	 */
	icon?: Game.Icon
	/**
	 * The version of the mod, must be in semver
	 */
	version: string
}
```

## Example

```ts
new Cppkies.Mod({
	keyname: "cppkies-mod-example",
	version: "1.0"
}, () => {
	// ...
})
```
> [!TIP]
> If you are using a bundler like Rollup or Webpack and submitted to Cppkies Mod Repository, you can import `package.json` in the file you register the mod and add the properties, like
> ```ts
>import package from "../package.json" // This may or may not be the default export, refer to your bundler to how it's done
>
>new Cppkies.Mod({
>	keyname: package.name,
>	name: package.ccrepo.name,
>	icon: package.ccrepo.icon,
>	version: package.version
>}, () => {
>	// ...
>})
>```

## Constructor properties

1. `metadata` - `ModMetadata` The mod metadata
2. `modFunction` - `(this: Mod) => void` The function which is called when Cppkies is loaded and the mod is should add all it's stuff

