import gameType, { FoolBuilding, Icon } from "./gameType"
import master from "./vars"
import { injectCode } from "./helpers"
import { Injection } from "./injects/generic"
import { loadBuilding } from "./saves"

/**
 * The art of a building, used for drawing the drawing in the middle
 */
interface Art {
	base?: string
	xV?: number
	yV?: number
	w?: number
	h?: number
	rows?: number
	x?: number
	y?: number
	pic?: string
	bg?: string
	frames?: number
}

/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */
export function createHooks(building: Building | gameType["Object"]): void {
	const injections: Injection[] = [
		new Injection("tooltip", () => {
			building.tooltip = injectCode(
				injectCode(building.tooltip, "return", "let ret = ", "replace"),
				null,
				`\n//Cppkies injection
		for(const i in Cppkies.buildingHooks["${building.name}"].tooltip) {
			const tempRet = Cppkies.buildingHooks["${building.name}"].tooltip[i].call(this, ret)
			ret = tempRet || ret
		}
		return ret`,
				"after"
			)
		}),
	]
	const dummy: Record<string, Function[]> = {}
	injections.forEach(inject => {
		dummy[inject.value] = inject.defValue
		if (inject.func) inject.func()
	})
	master.buildingHooks[building.name] = dummy
}

/**
 * The building class for creating new buildings
 */
export class Building extends window.Game.Object {
	iconLink: string
	bigIconLink: string
	/**
	 * Creates a new building and creates the hooks for it
	 * @param name The name of the building
	 * @param commonName Various additional string for the building, split by |:  The name of the building, then in plural, how the building produced the cookies, the effect from sugar lumps, then in plural
	 * @param desc The description of the building
	 * @param icon The icon for the building (Only the column matters)
	 * @param bigIcon The icon that shows up in store (Only the row matters)
	 * @param art The art for the building
	 * @param cpsFunc The function to calculate CPS
	 * @param buyFunction The function which gets called when it's bought
	 * @param foolObject The fool building to display during business day
	 * @param buildingSpecial The building special and building debuff
	 */
	constructor(
		name: string,
		commonName: string,
		desc: string,
		icon: Icon,
		bigIcon: Icon,
		art: Art,
		cpsFunc: (me: Building) => number,
		buyFunction: () => void,
		foolObject: FoolBuilding,
		buildingSpecial: [string, string]
	) {
		//Warn about enforced orders
		//TODO Create article
		if (icon[0] !== 0) {
			console.warn(
				"All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"
			)
		}
		if (bigIcon[1] !== 0) {
			console.warn(
				"All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"
			)
		}
		super(
			name,
			commonName,
			desc,
			bigIcon[0],
			icon[1],
			art,
			0, // The game automatically calculates Price and BaseCps
			cpsFunc,
			buyFunction
		)
		master.customBuildings.push(this)
		// Create hooks
		createHooks(this)
		//Manually relink canvases and contexts because Orteil made it so new buildings break the old canvas and context links
		for (const i in window.Game.ObjectsById) {
			if (parseInt(i) <= 0) continue
			const me = window.Game.ObjectsById[i]
			me.canvas = window.l(`rowCanvas${i}`)
			me.ctx = me.canvas.getContext("2d")
			//Relink their events too
			window.AddEvent(me.canvas, "mouseover", () => {
				me.mouseOn = true
			})
			window.AddEvent(me.canvas, "mouseout", () => {
				me.mouseOn = false
			})
			window.AddEvent(me.canvas, "mousemove", e => {
				const box = me.canvas.getBoundingClientRect()
				me.mousePos[0] = e.pageX - box.left
				me.mousePos[1] = e.pageY - box.top
			})
			//Restore minigames
			if (me.minigame && me.minigameLoaded) {
				const save = me.minigame.save()
				me.minigame.launch()
				me.minigame.load(save)
			}
		}
		this.buildingLink = bigIcon[2] || master.buildingLink + ""
		this.iconLink = icon[2] || master.iconLink + ""
		// This is the name, description, and icon used during Business Season
		if (foolObject) window.Game.foolObjects[name] = foolObject
		// The name of this building's golden cookie buff and debuff
		if (buildingSpecial)
			window.Game.goldenCookieBuildingBuffs[name] = buildingSpecial

		//CCSE.ReplaceBuilding(name)

		if (this.iconLink) {
			master.buildingHooks[this.name].tooltip.push((ret: string) =>
				this.locked
					? ret
					: ret.replace(
							"background-position",
							`background-image:url(${this.iconLink});background-position`
					  )
			)
		}

		window.Game.BuildStore()
		if (this.buildingLink) {
			master.hooks.postBuildStore.push(() => {
				window.l(
					`productIcon${this.id}`
				).style.backgroundImage = `url(${this.buildingLink})`
				window.l(
					`productIconOff${this.id}`
				).style.backgroundImage = `url(${this.buildingLink})`
			})
		}
		window.Game.BuildStore()
		this.canvas = window.l(`rowCanvas${this.id}`)
		this.ctx = this.canvas.getContext("2d")
		this.context = this.ctx
		this.pics = []
		const muteDiv = document.createElement("div")
		muteDiv.className = "tinyProductIcon"
		muteDiv.id = `mutedProduct${this.id}`
		muteDiv.style.display = "none"
		if (this.buildingLink)
			muteDiv.style.backgroundImage = `url(${this.buildingLink})`
		muteDiv.style.backgroundPositionX = `-${icon[0]}px`
		muteDiv.style.backgroundPositionY = `-${icon[1]}px`
		muteDiv.addEventListener("click", () => {
			this.mute(0)
			window.PlaySound(this.muted ? "snd/clickOff.mp3" : "snd/clickOn.mp3")
		})

		window.AddEvent(this.canvas, "mouseover", () => {
			this.mouseOn = true
		})
		window.AddEvent(this.canvas, "mouseout", () => {
			this.mouseOn = false
		})
		window.AddEvent(this.canvas, "mousemove", e => {
			const box = this.canvas.getBoundingClientRect()
			this.mousePos[0] = e.pageX - box.left
			this.mousePos[1] = e.pageY - box.top
		})
		window.l("buildingsMute").appendChild(muteDiv)
		// Load the save stuff
		const loadProps = loadBuilding(this)
		for (const i in loadProps) this[i] = loadProps[i]
		window.Game.recalculateGains = 1
	}
}
/**
 * The recommended function to pass in building CpsFunc
 * @param me Itself
 */
export const defaultCps = (me: Building): number =>
	window.Game.GetTieredCpsMult(me) * window.Game.magicCpS(me.name) * me.baseCps
/**
 * The reccomended function to pass in building BuyFunc
 */
export const defaultOnBuy = function(): void {
	window.Game.UnlockTiered(this)
	if (
		this.amount >= window.Game.SpecialGrandmaUnlock &&
		window.Game.Objects["Grandma"].amount > 0 &&
		this.grandma
	)
		window.Game.Unlock(this.grandma.name)
}
