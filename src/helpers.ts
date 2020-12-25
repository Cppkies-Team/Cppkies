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
 * The parameters of an injection, in order: `source`, `target`, `where`
 */
export type InjectParams = [
	string | RegExp | null,
	string,
	"before" | "replace" | "after"
]
/**
 * A helper helper function, which does a single inject to code
 * @param source The code to perform the inject on
 * @param config The configuration of the inject
 * @helper
 * @helperhelper
 */
function doSingleInject(source: string, config: InjectParams): string {
	const sliceMode = config[0] === null
	// Do this to mute typescript silly wrong errors
	let regex = new RegExp("")
	if (config[0] !== null) {
		if (typeof config[0] === "string")
			regex = new RegExp(escapeRegExp(config[0]), "g")
		else regex = config[0]
		if (!regex.test(source)) console.warn("Nothing to inject.")
	}

	const findStart = /(\)[^{]*{)/
	const findEnd = /(}?)$/

	switch (config[2]) {
		case "before":
			if (sliceMode) source = source.replace(findStart, `$1${config[1]}`)
			else source = source.replace(regex, `${config[1]}${config[0]}`)
			break
		case "replace":
			if (sliceMode) source = config[1]
			else source = source.replace(regex, config[1])
			break
		case "after":
			if (sliceMode) source = source.replace(findEnd, `${config[1]}$1`)
			else source = source.replace(regex, `${config[0]}${config[1]}`)
			break
		default:
			throw new Error('where Parameter must be "before", "replace" or "after"')
	}
	return source
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
	const newFunc = Function(
		...Object.keys(context),
		`return (${doSingleInject(func.toString(), [source, target, where])})`
	)(...Object.values(context))
	newFunc.prototype = func.prototype
	return newFunc
}

/**
 * A helper function which replaces(or appends) code in a function, returning the new function, and it's eval free!
 * @param func The source function
 * @param injections The injections to apply, the parameters of an injection, in order: `source`, `target`, `where`
 * @param context The optional context to use
 * @helper
 */
export function injectCodes<
	T extends
		| ((...args: unknown[]) => unknown)
		| (new (...args: unknown[]) => unknown)
>(func: T, injections: InjectParams[], context: object = {}): T {
	let newStr = func.toString()
	for (const injection of injections) newStr = doSingleInject(newStr, injection)
	const newFunc = Function(
		...Object.keys(context),
		`return (${newStr})`
	)(...Object.values(context))
	newFunc.prototype = func.prototype
	return func
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
/**
 * Creates a roman numeral from a number
 * @param num The number to convert
 * @helper
 */
export function toRomanNumeral(num: number): string {
	const lookup = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	] as const
	let roman = ""

	for (const charType of lookup) {
		while (num >= charType[0]) {
			roman += charType[1]
			num -= charType[0]
		}
	}
	return roman
}
