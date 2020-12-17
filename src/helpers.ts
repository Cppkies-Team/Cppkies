/**
 * The common type for a value, can be either the value or a function that returns a value with the type.
 */
export type CommonValue<T> = T | (() => T)
/**
 * A helper function which converts a common value to a value
 * @param value The common value to convert
 * @helper
 */
export function getValue<T>(value: CommonValue<T>): T {
	if (value instanceof Function) return value()
	return value
}
/**
 * A helper function which escapes special regex characters.
 * @param str The string to escape
 * @helper
 */
export function escapeRegExp(str: string): string {
	// eslint-disable-next-line no-useless-escape
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}
/**
 * A helper function which replaces(or appends) code in a function, returning the new function, and it's eval free!
 * @param func The source function
 * @param source What to replace, can be null for slicing
 * @param target What to put instead of (or before/after) the source
 * @param where Where to insert or replace your injection
 * @param context The optional context to use
 * @helper
 */
export function injectCode<
	T extends
		| ((...args: unknown[]) => unknown)
		| (new (...args: unknown[]) => unknown)
>(
	func: T,
	source: string | RegExp | null,
	target: string,
	where: "before" | "replace" | "after",
	context: object = {}
): T {
	let newFuncStr = func.toString()
	const sliceMode = source === null
	// Do this to mute typescript silly wrong errors
	let regex = new RegExp("")
	if (source !== null) {
		if (typeof source === "string")
			regex = new RegExp(escapeRegExp(source), "g")
		else regex = source
		if (!regex.test(newFuncStr)) console.warn("Nothing to inject.")
	}

	const findStart = /(\)[^{]*{)/
	const findEnd = /(}?)$/

	switch (where) {
		case "before":
			if (sliceMode) newFuncStr = newFuncStr.replace(findStart, `$1${target}`)
			else newFuncStr = newFuncStr.replace(regex, `${target}${source}`)
			break
		case "replace":
			if (sliceMode) newFuncStr = `${target}`
			else newFuncStr = newFuncStr.replace(regex, `${target}`)
			break
		case "after":
			if (sliceMode) newFuncStr = newFuncStr.replace(findEnd, `${target}$1`)
			else newFuncStr = newFuncStr.replace(regex, `${source}${target}`)
			break
		default:
			throw new Error('where Parameter must be "before", "replace" or "after"')
	}
	const newFunc = Function(
		...Object.keys(context),
		`return (${newFuncStr})`
	)(...Object.values(context))
	newFunc.prototype = func.prototype
	return newFunc
}
/**
 * Applies all props to an object via mutating
 * @param targObj The object which will be mutated
 * @param srcObj The object which properties will be applied to the target object
 */

export function applyAllProps(targObj: object, srcObj: object): void {
	for (const i in srcObj) targObj[i] = srcObj[i]
}

/**
 * Converts a string to sentense case, AKA first letter upper, all next lower
 * @param string
 */
export function toSentenseCase(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

/**
 * A strongly typed `hasOwnProperty`
 * @helper
 */
export function hasOwnProperty<X extends object, Y extends PropertyKey>(
	obj: X,
	prop: Y
): obj is X & Record<Y, unknown> {
	// eslint-disable-next-line no-prototype-builtins
	return obj.hasOwnProperty(prop)
}
