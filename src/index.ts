export { iconsNamespace as icons } from "./spritesheets"
export { miscValues } from "./vars"
export { InjectParams, injectCode, injectCodes } from "./helpers"
export * from "./upgrades"
export * from "./achievements"
export * from "./buildings"
export * from "./dragon"
export * from "./milk"
export * from "./tiers"
export * from "./mods"
export * from "./modUI"
export { default as hooks } from "./injects/basegame"
export { buildingHooks } from "./injects/buildings"
export { save } from "./saves"
export * from "./ccUI"

declare global {
	interface Window {
		CPPKIES_ONLOAD: (() => void)[] | undefined
		Cppkies: unknown
	}
}

export * from "./loadValues"
export * from "./minigames/pantheon"

import "./onLoad"
