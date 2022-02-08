import { toRomanNumeral } from "./helpers"
import { Mod, OwnershipUnit } from "./mods"
import { resolveIcon } from "./spritesheets"
import { setUnitOwner } from "./vars"

type MilkClass = typeof Game.Milk

export class Milk implements MilkClass, OwnershipUnit {
	icon: [number, number]
	iconLink?: string
	owner?: Mod
	bname: string
	type = 0 as const
	/**
	 * Creates a new milk type
	 * @param name The name of the milk
	 * @param icon The icon of the mink
	 * @param pic The image to use for the milk itself, must end in .png
	 * @param special If true, the milk is only avaliable via milk selector
	 */
	constructor(
		public name: string,
		icon: Game.Icon,
		public pic: string,
		public special = false
	) {
		setUnitOwner(this)
		this.bname = loc(name)
		if (!pic.endsWith(".png"))
			throw new Error(
				`Can't create milk with the milk URL "${pic}", the URL must end with .png!`
			)
		if (!special)
			this.name = `Rank ${toRomanNumeral(Game.Milks.length + 1)} - ${name}`
		this.pic = pic.substr(0, pic.length - 4)
		resolveIcon(icon)
		this.icon = [icon[0], icon[1]]
		this.iconLink = icon[2]
		// TODO: Special milks
		if (special) Game.Milks[Object.keys(Game.Milks).length] = this
		else Game.Milks.push(this)
	}
}
