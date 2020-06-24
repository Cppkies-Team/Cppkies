import Game from "../src/gameType"
declare let Game: Game
declare let Cppkies: typeof import("../dist").default

export default async function(): Promise<void> {
	await page.goto("https://orteil.dashnet.org/cookieclicker")
	await ((): Promise<void> => {
		return new Promise(res => {
			setTimeout(() => {
				if (page.evaluate(() => Game && Game.ready)) res()
			}, 100)
		})
	})()
	await await page.evaluate(() => {
		Game.LoadMod("http://localhost:5501/dist/index.js")
		if (!globalThis.CPPKIES_ONLOAD) globalThis.CPPKIES_ONLOAD = []
		return new Promise(resolve => {
			globalThis.CPPKIES_ONLOAD.push(() => resolve())
		})
	})
	// Transfer Game and Cppkies into global scope
	//globalThis.Game = await page.evaluate(() => globalThis.Game)
	//globalThis.Cppkies = await page.evaluate(() => globalThis.Cppkies)
}
