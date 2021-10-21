let loaded = false

export function setLoaded(): void {
	loaded = true
}

/**
 * An array of functions to call on Cppkies load
 * Functions pushed here after Cppkies has loaded are executed immediately
 * It is reccomended to use `Cppkies.deffer` instead
 */
export const onLoad: Array<() => void> = new Proxy([], {
	set: (target, key, value): boolean => {
		if (typeof value === "function" && loaded) value()
		else target[(key as unknown) as number] = value as never
		return true
	},
})

export let defferResolve: (() => void) | undefined

/**
 * A promise which is resolved on Cppkies load
 */
export const deffer = new Promise<void>(res => (defferResolve = res))

export const todoBeforeLoad: (() => Promise<unknown> | void)[] = []
