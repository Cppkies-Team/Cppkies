import { miscValues } from "./vars"
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
	delete aliases[name]
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
 * A local helper to fetch an image from an image link
 * @param link The image URI
 */
function generateImageFromLink(link: string): Promise<HTMLImageElement> {
	return new Promise(resolve => {
		const img = new Image()
		img.addEventListener("load", (): void => {
			resolve(img)
		})
		img.crossOrigin = "Anonymous"
		img.src = link
	})
}

/**
 * A local helper to create a blob URI from a canvas buffer
 */
function toBlobURI(buf: CanvasRenderingContext2D): Promise<string> {
	return new Promise(resolve => {
		buf.canvas.toBlob((blob: Blob | null) => {
			resolve(URL.createObjectURL(blob))
		})
	})
}

/**
 * Relocates the icons on an iconsheets
 * @param link The link to the original file
 * @param icons The definition of iconName: iconPosition
 * @param matrix The matrix of icon names
 * @param iconSize The size of a single icon
 * @param size The size of the new spritesheet
 * @param postProcess Optional operations after the relink
 */
function relink(
	link: string,
	icons: Record<string, [number, number]>,
	matrix: string[][] | string[],
	iconSize: [number, number],
	size: [number, number],
	postProcess?: (ctx: CanvasRenderingContext2D) => void | Promise<void>
): Promise<string> {
	return new Promise(resolve => {
		if (!(matrix[0] instanceof Array)) matrix = [matrix as string[]]
		matrix = matrix as string[][]
		//Collect references
		const references: Record<string, Game.Icon> = {}
		for (const y in matrix)
			for (const x in matrix[y]) {
				// Ignore if falsy
				if (!matrix[y][x]) continue
				matrix[y][x] = matrix[y][x].toString().toLowerCase()
				if (!(matrix[y][x] in icons)) throw new Error("Invalid icon name")
				references[matrix[y][x]] = [parseInt(x), parseInt(y)]
			}
		//Draw new column
		const buffer = document
			.createElement("canvas")
			.getContext("2d") as CanvasRenderingContext2D
		const img = new Image()
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
			const postPostProcess = (): void => {
				toBlobURI(buffer).then(resolve)
			}
			let ret: void | Promise<void>
			if (postProcess) ret = postProcess(buffer)
			if (ret instanceof Promise) ret.then(postPostProcess)
			else postPostProcess()
		})
		img.crossOrigin = "Anonymous"
		img.src = link
	})
}

/**
 * The amount of column relinks a URI has been to
 */
const columnRelinkAmount: Record<string, number> = {}

/**
 * Additional icons which aren't defined with tiers
 */
export const extraColumnIcons: Record<string, [number, number]> = {
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
 * @param matrix The matrix of the names of the icon tiers
 * Valid tier names are:
 * * Tier ids: `1`, `5`, `7`, etc.
 * * Tier names: `"jetmint"`, `"plain"`, etc.
 * * Non-standard tier icon tiers: `"3d"`, `"milestone1"`, `"milestone2"`, `"milestone3"`, `"krumblor"`, `"level1"`, `"level2"`
 * @param offset The icon X to offset the column
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export async function relinkColumn(
	link: string,
	matrix: string[] | string[][],
	offset?: number,
	followAlias = false
): Promise<void> {
	// Automatically offset the X by 1 for each relink
	if (offset === undefined) {
		if (!columnRelinkAmount[link]) columnRelinkAmount[link] = 0
		offset = columnRelinkAmount[link]++
	}
	const columnIcons: Record<string, [number, number]> = {}
	for (const i in extraColumnIcons) {
		columnIcons[i] = [offset, extraColumnIcons[i][1]]
	}
	// Automatically generate normal tiers
	for (const i in Game.Tiers)
		columnIcons[Game.Tiers[i].name.toLowerCase()] = columnIcons[
			i.toString()
		] = [offset, Game.Tiers[i].iconRow]
	alias(
		link,
		await relink(
			followAlias ? resolveAlias(link) : link,
			columnIcons,
			matrix,
			[48, 48],
			[
				(offset + 1) * 48,
				(Object.values(columnIcons).reduce(
					(acc, value) => Math.max(acc, value[1]),
					-Infinity
				) +
					1) *
					48,
			],
			ctx => {
				return new Promise(resolve => {
					// If not first relink, append to original image
					if (resolveAlias(link) !== link) {
						const img = new Image()
						img.addEventListener("load", (): void => {
							ctx.drawImage(img, 0, 0)
							resolve()
						})
						img.src = resolveAlias(link)
						img.crossOrigin = "Anonymous"
					} else resolve()
				})
			}
		)
	)
}

/**
 * The amount of row relinks a URI has been to
 */
const rowRelinkAmount: Record<string, number> = {}

/**
 * Additional icons which aren't defined with buildings
 */
export const extraRowIcons: Record<string, [number, number]> = {
	research: [9, 0],
	cookie: [10, 0],
	mouse: [11, 0],
	multicursor: [12, 0],
	kitten: [18, 0],
}
/**
 * Relocates the icons for a row and automatically aliases it
 * @param link The link to the original, unordered iconsheet
 * @param matrix The matrix of the names of the icon types
 * Valid tier types are:
 * * Building ids: `1, `5`, `7`, etc.
 * * Building names: `"cursor"`, `"farm"`, etc.
 * * Non-standard tier icon tiers: `"research"`, `"cookie"`, `"mouse"`, `"multicursor"`, `"kitten"`
 * @param offset The icon X to offset the column
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export async function relinkRow(
	link: string,
	matrix: string[] | string[][],
	offset?: number,
	followAlias = false
): Promise<void> {
	if (offset === undefined) {
		if (!rowRelinkAmount[link]) rowRelinkAmount[link] = 0
		offset = rowRelinkAmount[link]++
	}
	const rowIcons: Record<string, [number, number]> = {}
	for (const i in extraRowIcons) {
		rowIcons[i] = [extraRowIcons[i][0], offset]
	}
	// Automatically generate normal buildings
	for (const i in Game.ObjectsById)
		rowIcons[Game.ObjectsById[i].single.toLowerCase()] = rowIcons[i] = [
			Game.ObjectsById[i].iconColumn,
			offset,
		]
	alias(
		link,
		await relink(
			followAlias ? resolveAlias(link) : link,
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
				(offset + 1) * 48,
			],
			ctx => {
				return new Promise(resolve => {
					// If not first relink, append to original image
					if (resolveAlias(link) !== link) {
						const img = new Image()
						img.addEventListener("load", (): void => {
							ctx.drawImage(img, 0, 0)
							resolve()
						})
						img.src = resolveAlias(link)
						img.crossOrigin = "Anonymous"
					} else resolve()
				})
			}
		)
	)
}

/**
 * Patches an iconsheet with replacements
 * @param link The link to the original, unpatched iconsheet
 * @param replacements The replacements to make, first element in tuple is the original position,
 * second is the icon to replace with
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export async function patchIconsheet(
	link: string,
	replacements: [[number, number], Game.Icon][],
	followAlias = true
): Promise<void> {
	// First, create a canvas with the original image
	const buffer = document
		.createElement("canvas")
		.getContext("2d") as CanvasRenderingContext2D
	const ogImg = await generateImageFromLink(
		followAlias ? resolveAlias(link) : link
	)
	const maxSize = [ogImg.width, ogImg.height]
	// Get the size of the output canvas
	for (const place of replacements) {
		if (place[0][0] * 48 > maxSize[0]) maxSize[0] = place[0][0] * 48
		if (place[0][1] * 48 > maxSize[1]) maxSize[1] = place[0][1] * 48
	}
	buffer.canvas.width = maxSize[0]
	buffer.canvas.height = maxSize[1]
	buffer.drawImage(ogImg, 0, 0)
	// Generate a cache
	const replacementCache: Record<string, HTMLImageElement> = {}
	for (const replacement of replacements) {
		// Little trick, here, if icon [2] is "", go to "img/icons.png" instead of `miscValues.iconLink`
		const iconLink = resolveAlias(
			(replacement[1][2] ?? miscValues.iconLink) || "img/icons.png"
		)
		if (!replacementCache[iconLink])
			replacementCache[iconLink] = await generateImageFromLink(iconLink)
		// Clear the icon beforehand
		buffer.clearRect(replacement[0][0] * 48, replacement[0][1] * 48, 48, 48)

		buffer.drawImage(
			replacementCache[iconLink],
			replacement[1][0] * 48,
			replacement[1][1] * 48,
			48,
			48,
			replacement[0][0] * 48,
			replacement[0][1] * 48,
			48,
			48
		)
	}
	alias(link, await toBlobURI(buffer))
}

export function resolveIcon(icon: Game.Icon): Game.Icon {
	icon = [...icon]
	if (icon[2] === undefined || icon[2] === null)
		icon[2] = resolveAlias(miscValues.iconLink)
	else icon[2] = resolveAlias(icon[2])
	return icon
}
