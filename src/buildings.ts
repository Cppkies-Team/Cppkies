import master from "./vars"
import { injectCode } from "./helpers"
import { Injection } from "./injects/generic"
import { loadBuilding } from "./saves"
import { resolveAlias } from "./spritesheets"
import { ReturnableEventEmitter } from "./lib/eventemitter"

export const buildingHooks: Record<string, BuildingHooks> = {}
export const customBuildings: Building[] = []
/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */

export type BuildingHooks = ReturnableEventEmitter<{
	tooltip: [
		{ building: Game.Object; str: string },
		{ building: Game.Object; str: string }
	]
	cps: [number, number]
}>

export function createHooks(building: Building | Game.Object): void {
	const emitter: BuildingHooks = new ReturnableEventEmitter()
	const injections = [
		new Injection("tooltip", () => {
			building.tooltip = injectCode(
				injectCode(building.tooltip, "return", "let ret = ", "replace"),
				null,
				`\n//Cppkies injection
				return Cppkies.buildingHooks["${building.name}"].emit("tooltip", { building: this, str: ret}).str`,
				"after"
			)
		}),
	]
	injections.forEach(inject => {
		inject?.func()
	})
	buildingHooks[building.name] = emitter
}

/**
 * The building class for creating new buildings
 */
export class Building extends Game.Object {
	iconLink: string
	buildingLink: string
	/**
	 * Creates a new building and creates the hooks for it
	 * @param name The name of the building
	 * @param commonName Various additional string for the building, split by |:  The name of the building, then in plural, how the building produced the cookies, the effect from sugar lumps, then in plural
	 * @param desc The description of the building
	 * @param icon The icon for the building (Only the column matters) (See http://cppkies.js.org/#/./CommonProblems?id=relink-column for instructions about the icons)
	 * @param bigIcon The icon that shows up in store (Only the row matters) (See http://cppkies.js.org/#/./CommonProblems?id=big-icons for instructions about the big icons)
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
		icon: Game.Icon,
		bigIcon: Game.Icon,
		art: Game.Art,
		cpsFunc: (me: Building) => number,
		buyFunction: () => void,
		foolObject: Game.FoolBuilding,
		buildingSpecial: [string, string]
	) {
		//Warn about enforced orders
		//TODO Create article
		if (icon[1] !== 0) {
			console.warn(
				"All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=relink-column"
			)
		}
		if (bigIcon[0] !== 0) {
			console.warn(
				"All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=big-icons"
			)
		}
		super(
			name,
			commonName,
			desc,
			bigIcon[1],
			icon[0],
			art,
			0, // The game automatically calculates Price and BaseCps
			cpsFunc,
			buyFunction
		)
		customBuildings.push(this)
		// Create hooks
		createHooks(this)
		//Manually relink canvases and contexts because Orteil made it so new buildings break the old canvas and context links
		for (const i in Game.ObjectsById) {
			if (parseInt(i) <= 0) continue
			const me = Game.ObjectsById[i]
			me.canvas = l(`rowCanvas${i}`) as HTMLCanvasElement
			if (!me.canvas) continue
			me.ctx = me.canvas.getContext("2d")
			//Relink their events too
			me.canvas.addEventListener("mouseover", () => {
				me.mouseOn = true
			})
			me.canvas.addEventListener("mouseout", () => {
				me.mouseOn = false
			})
			me.canvas.addEventListener("mousemove", e => {
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
		this.iconLink = resolveAlias(icon[2] || master.iconLink + "")
		// This is the name, description, and icon used during Business Season
		if (foolObject) Game.foolObjects[name] = foolObject
		// The name of this building's golden cookie buff and debuff
		if (buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial

		if (this.iconLink) {
			buildingHooks[this.name].on("tooltip", ret => ({
				str: this.locked
					? ret.str
					: ret.str.replace(
							"background-position",
							`background-image:url(${this.iconLink});background-position`
					  ),
				building: ret.building,
			}))
		}

		Game.BuildStore()
		if (this.buildingLink) {
			master.hooks.on("buildStore", () => {
				l(
					`productIcon${this.id}`
				).style.backgroundImage = `url(${this.buildingLink})`
				l(
					`productIconOff${this.id}`
				).style.backgroundImage = `url(${this.buildingLink})`
			})
		}
		Game.BuildStore()
		this.canvas = l(`rowCanvas${this.id}`) as HTMLCanvasElement
		this.ctx = this.canvas.getContext("2d")
		//this.context = this.ctx
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
		this.canvas.addEventListener("mousemove", e => {
			const box = this.canvas.getBoundingClientRect()
			this.mousePos[0] = e.pageX - box.left
			this.mousePos[1] = e.pageY - box.top
		})
		l("buildingsMute").appendChild(muteDiv)
		// Load the save stuff
		const loadProps = loadBuilding(this)
		for (const i in loadProps) this[i] = loadProps[i]
		Game.recalculateGains = 1
	}
}
/**
 * The recommended function to pass in building CpsFunc
 * @param me Itself
 */
export const defaultCps = (me: Building): number =>
	Game.GetTieredCpsMult(me) * Game.magicCpS(me.name) * me.baseCps
/**
 * The reccomended function to pass in building BuyFunc
 */
export const defaultOnBuy = function(): void {
	Game.UnlockTiered(this)
	if (
		this.amount >= Game.SpecialGrandmaUnlock &&
		Game.Objects["Grandma"].amount > 0 &&
		this.grandma
	)
		Game.Unlock(this.grandma.name)
}
