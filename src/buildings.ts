import { resolveAlias } from "./spritesheets"
import hooks from "./injects/basegame"
import { buildingHooks, createBuildingHooks } from "./injects/buildings"
import { miscValues, customBuildings, setUnitOwner } from "./vars"
import { shouldRunVersioned } from "./injects/generic"
import { Mod, OwnershipUnit } from "./mods"
import { ModSave, ModSavePartition, save } from "./saves"

/**
 * The save type for a building
 */
export interface BuildingSave {
	amount: number
	bought: number
	free: number
	totalCookies: number
	level: number
	muted: number
	minigameSave: string
}

declare module "./saves" {
	export interface ModSave {
		buildings?: Record<string, BuildingSave>
	}
}

function loadBuilding(save: ModSave, building: Building): void {
	const buildingSave = save.buildings?.[building.name] || {
		amount: 0,
		bought: 0,
		free: 0,
		level: 0,
		minigameSave: "",
		muted: 0,
		totalCookies: 0,
	}

	building.amount = buildingSave.amount
	building.bought = buildingSave.bought
	building.free = buildingSave.free
	building.level = buildingSave.level
	building.minigameSave = buildingSave.minigameSave
	building.muted = buildingSave.muted
	building.totalCookies = buildingSave.totalCookies
}

new ModSavePartition(
	"buildings",
	1,
	"mixed",
	(save, mod) => {
		for (const building of customBuildings) {
			if (building.owner !== mod) continue
			if (!save.buildings) save.buildings = {}
			save.buildings[building.name] = {
				amount: building.amount,
				bought: building.bought,
				free: building.free,
				level: building.level,
				minigameSave: building.minigameSave,
				muted: building.muted,
				totalCookies: building.totalCookies,
			}
		}
	},
	(save, mod) => {
		if (!save.buildings) return
		for (const building of customBuildings) {
			if (building.owner !== mod) continue
			loadBuilding(save, building)
		}
	},
	(save, resetType) => {
		if (resetType === "hard") {
			delete save.buildings
			return
		}
		if (!save.buildings) return
		for (const building of Object.values(save.buildings)) {
			building.amount = 0
			building.bought = 0
			building.free = 0
			building.totalCookies = 0
		}
	}
)

/**
 * The building class for creating new buildings
 */
export class Building extends Game.Object implements OwnershipUnit {
	iconLink: string
	buildingLink: string
	owner?: Mod
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
		cpsFunc: (me: Game.Object) => number,
		buyFunction: (this: Game.Object) => void,
		foolObject: Game.FoolBuilding,
		buildingSpecial: [string, string]
	) {
		if (Game.Objects[name])
			throw new Error(
				`Can't create building, "${name}" is already used as a building name`
			)
		//Warn about enforced orders
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
		setUnitOwner(this)
		customBuildings.push(this)
		//Manually relink canvases and contexts because Orteil made it so new buildings break the old canvas and context links
		for (const i in Game.ObjectsById) {
			if (parseInt(i) <= 0) continue
			const me = Game.ObjectsById[i]
			me.canvas = l(`rowCanvas${i}`) as HTMLCanvasElement
			if (!me.canvas) continue
			// Why does getContext return null possibly???
			me.ctx = me.canvas.getContext("2d") as CanvasRenderingContext2D
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
		this.buildingLink = bigIcon[2] ?? miscValues.buildingLink
		this.iconLink = resolveAlias(icon[2] ?? miscValues.iconLink)
		// This is the name, description, and icon used during Business Season
		if (foolObject) Game.foolObjects[name] = foolObject
		// The name of this building's golden cookie buff and debuff
		if (buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial

		Game.BuildStore()
		if (this.buildingLink) {
			hooks.on("buildStore", () => {
				const productIcon = document.getElementById(`productIcon${this.id}`),
					productIconOff = document.getElementById(`productIconOff${this.id}`)
				if (!(productIcon && productIconOff)) return
				productIcon.style.backgroundImage = `url(${this.buildingLink})`
				productIconOff.style.backgroundImage = `url(${this.buildingLink})`
			})
		}
		Game.BuildStore()
		this.canvas = l(`rowCanvas${this.id}`) as HTMLCanvasElement
		// Why does getContext return null possibly???
		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
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
		const muteElement = document.getElementById("buildingsMute")
		if (muteElement) muteElement.appendChild(muteDiv)
		// Load the save stuff
		loadBuilding(this.owner || save.foreign, this)

		Game.recalculateGains = 1
	}
}
/**
 * The recommended function to pass in building CpsFunc
 * @param me Itself
 */
export const DEFAULT_CPS = (me: Game.Object): number =>
	Game.GetTieredCpsMult(me) * Game.magicCpS(me.name) * me.baseCps
/**
 * The reccomended function to pass in building BuyFunc
 */
export const DEFAULT_ONBUY = function (this: Game.Object): void {
	Game.UnlockTiered(this)
	if (
		this.amount >= Game.SpecialGrandmaUnlock &&
		Game.Objects["Grandma"].amount > 0 &&
		this.grandma
	)
		Game.Unlock(this.grandma.name)
}

if (shouldRunVersioned("customBuildingIcons"))
	hooks.on("getIcon", ({ icon, type }) => {
		customBuildings.forEach(val => {
			if (val.name === type && val.iconLink) icon[2] = val.iconLink
		})
		return icon
	})

if (shouldRunVersioned("buildingImageTooltip"))
	buildingHooks.on("tooltip", ({ building, tooltip }) => {
		if (building instanceof Building && !building.locked)
			tooltip = tooltip.replace(
				"background-position",
				`background-image:url(${building.iconLink});background-position`
			)
		return tooltip
	})
