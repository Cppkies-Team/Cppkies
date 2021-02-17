/*import GameT from "../src/types/gameType"
declare let Game: typeof GameT*/
jest.setTimeout(60000)

beforeAll(async () => {
	await page.goto("https://orteil.dashnet.org/cookieclicker")
	await ((): Promise<void> => {
		return new Promise(res => {
			const timeoutId = setInterval(() => {
				if (page.isClosed()) clearInterval(timeoutId)
				if (page.evaluate(() => Game && Game.ready)) {
					clearInterval(timeoutId)
					res()
				}
			}, 100)
		})
	})()
})

describe("Sanity checks", () => {
	// Really unstable for some reason
	/*it("Should reference dashnet", async () => {
		await expect(page).toMatch(/dashnet/i)
	})*/

	it("Should be able to load mods", async () => {
		await page.evaluate(() =>
			Game.LoadMod(
				"data:text/plain;charset=utf-8;base64,Y29uc29sZS5sb2coIkhlbGxvIik="
			)
		)
	})
	it("Should be able to load Cppkies", async () => {
		await page.evaluate(() => {
			Game.LoadMod("http://localhost:5501/dist/index.js")
			if (!globalThis.CPPKIES_ONLOAD) globalThis.CPPKIES_ONLOAD = []
			return new Promise<void>(resolve => {
				;(globalThis.CPPKIES_ONLOAD as (() => void)[]).push(resolve)
			})
		})
	})
})
