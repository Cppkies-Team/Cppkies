import "expect-puppeteer"
import Game from "../src/gameType"
declare let Game: Game

beforeAll(async () => {
	await page.goto("https://orteil.dashnet.org/cookieclicker")
	await ((): Promise<void> => {
		return new Promise(res => {
			setTimeout(() => {
				if (page.evaluate(() => Game && Game.ready)) res()
			}, 100)
		})
	})()
})

describe("Sanity checks", () => {
	// Really unstable for some reason
	/*it("Should reference dashnet", async () => {
		await expect(page).toMatch(/dashnet/i)
	})*/
	it("No Cppkies or CCSE should be present", async () => {
		expect(
			await page.evaluate(() => globalThis.CCSE || globalThis.Cppkies)
		).toBeUndefined()
	})

	it("Should be able to load mods", async () => {
		await page.evaluate(() =>
			Game.LoadMod(
				"data:text/plain;charset=utf-8;base64,Y29uc29sZS5sb2coIkhlbGxvIik="
			)
		)
	})
	it("Should be able to load Cppkies", async () => {
		await await page.evaluate(() => {
			Game.LoadMod("http://localhost:5501/dist/index.js")
			if (!globalThis.CPPKIES_ONLOAD) globalThis.CPPKIES_ONLOAD = []
			return new Promise(resolve => {
				globalThis.CPPKIES_ONLOAD.push(() => resolve())
			})
		})
	})
})