// Resolve aliases
/**
 * Currently defined alias
 */
export const aliases: Record<string, string> = {}
let steppedAliases: string[] = []
/**
 * Creates an alias from an old name to a new one
 * @param oldName The current name
 * @param aliasName The new, alias name
 */
export function alias(oldName: string, aliasName: string): void {
	aliases[oldName] = aliasName
}

/**
 * Deletes an alias from the name
 * @param name The name to remove an alias from
 */
export function unalias(name: string): void {
	delete alias[name]
}

/**
 * Resolves an aliased name
 * @param name The name to be resolved
 */
export function resolveAlias(name: string): string {
	if (steppedAliases.includes(name)) throw new Error("Recursive alias")
	steppedAliases.push(name)
	if (name in aliases) return resolveAlias(aliases[name])
	steppedAliases = []
	return name
}

/**
 * A universal version of Icon which is not restricted to CC
 */
export type UniversalIcon = [number, number]
/**
 * Relocates the icons on an iconsheets
 * @param link The link to the original file
 * @param icons The definition of iconName: iconPosition
 * @param matrix The matrix of icon names
 * @param iconSize The size of a single icon
 * @param size The size of the new spritesheet
 */
function relink(
	link: string,
	icons: Record<string, UniversalIcon>,
	matrix: string[][] | string[],
	iconSize: [number, number],
	size: [number, number]
): Promise<string> {
	return new Promise(resolve => {
		if (!(matrix[0] instanceof Array)) matrix = [matrix as string[]]
		matrix = matrix as string[][]
		//Collect references
		const references: Record<string, Game.Icon> = {}
		for (const y in matrix)
			for (const x in matrix[y]) {
				matrix[y][x] = matrix[y][x].toString().toLowerCase()
				if (!(matrix[y][x] in icons)) throw new Error("Invalid icon name")
				references[matrix[y][x]] = [parseInt(x), parseInt(y)]
			}
		//Draw new column
		const buffer = document.createElement("canvas").getContext("2d")
		const img = new Image()
		img.src = link
		img.crossOrigin = "Anonymous"
		img.addEventListener("load", (): void => {
			buffer.canvas.width = size[0]
			buffer.canvas.height = size[1]
			for (const i in references)
				buffer.drawImage(
					img,
					references[i][0] * iconSize[0],
					references[i][1] * iconSize[1],
					iconSize[0],
					iconSize[1],
					icons[i][0] * iconSize[0],
					icons[i][1] * iconSize[1],
					iconSize[0],
					iconSize[1]
				)
			buffer.canvas.toBlob((blob: Blob) => {
				resolve(URL.createObjectURL(blob))
			})
		})
	})
}
/**
 * Additional icons which aren't defined with tiers
 */
const extraColumnIcons: Record<string, UniversalIcon> = {
	"3d": [0, 21],
	milestone1: [0, 22],
	milestone2: [0, 23],
	milestone3: [0, 24],
	krumblor: [0, 25],
	level1: [0, 26],
	level2: [0, 27],
}
/**
 * Relocates the icons for a column and automatically aliases it
 * @param link The link to the original, unordered iconsheet
 * @param matrix The matrix of
 */
export async function relinkColumn(
	link: string,
	matrix: string[] | string[][]
): Promise<void> {
	const columnIcons: Record<string, UniversalIcon> = { ...extraColumnIcons }
	// Automatically generate normal tiers
	for (const i in Game.Tiers)
		columnIcons[Game.Tiers[i].name.toLowerCase()] = columnIcons[
			i.toString()
		] = [0, Game.Tiers[i].iconRow]
	alias(
		link,
		await relink(
			link,
			columnIcons,
			matrix,
			[48, 48],
			[
				48,
				(Object.values(columnIcons).reduce(
					(acc, value) => Math.max(acc, value[1]),
					-Infinity
				) +
					1) *
					48,
			]
		)
	)
}

/**
 * Additional icons which aren't defined with buildings
 */
const extraRowIcons: Record<string, UniversalIcon> = {
	research: [9, 0],
	cookie: [10, 0],
	mouse: [11, 0],
	multicursor: [12, 0],
}
/**
 * Relocates the icons for a row and automatically aliases it
 * @param link The link to the original, unordered iconsheet
 * @param matrix The matrix of
 */
export async function relinkRow(
	link: string,
	matrix: string[] | string[][]
): Promise<void> {
	const rowIcons: Record<string, UniversalIcon> = { ...extraRowIcons }
	// Automatically generate normal buildings
	for (const i in Game.ObjectsById)
		rowIcons[Game.ObjectsById[i].single.toLowerCase()] = rowIcons[i] = [
			Game.Tiers[i].iconRow,
			0,
		]
	alias(
		link,
		await relink(
			link,
			rowIcons,
			matrix,
			[48, 48],
			[
				(Object.values(rowIcons).reduce(
					(acc, value) => Math.max(acc, value[0]),
					-Infinity
				) +
					1) *
					48,
				48,
			]
		)
	)
}
