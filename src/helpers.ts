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
 * @helper
 */
export function injectCode(
	func: Function,
	source: CommonValue<string> | CommonValue<RegExp> | null,
	target: CommonValue<string>,
	where: "before" | "replace" | "after"
): Function {
	let newFuncStr = func.toString()
	const sliceMode = source === null
	let regex: RegExp
	if (!sliceMode) {
		source = getValue(source)
		if (typeof source === "string")
			regex = new RegExp(escapeRegExp(source), "g")
		else regex = source
	}
	target = getValue(target)
	const findStart = /(\)[^{]*{)/
	const findEnd = /(}?)$/
	if (!sliceMode && !regex.test(newFuncStr)) console.warn("Nothing to inject.")
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
	const newFunc = new Function(`return (${newFuncStr})`)()
	newFunc.prototype = func.prototype
	return newFunc
}
/**
 * Applies all props to an object via mutating
 * @param targObj The object which will be mutated
 * @param srcObj The object which properties will be applied to the target object
 */

export function applyAllProps(targObj, srcObj): void {
	for (const i in srcObj) targObj[i] = srcObj
}

/**
 * Converts a string to sentense case, AKA first letter upper, all next lower
 * @param strign
 */
export function toSentenseCase(strign: string): string {
	return strign.charAt(0).toUpperCase() + strign.slice(1).toLowerCase()
}
