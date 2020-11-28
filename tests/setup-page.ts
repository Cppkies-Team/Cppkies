import { Page } from "puppeteer"

export default async function(page: Page): Promise<void> {
	await page.goto("https://orteil.dashnet.org/cookieclicker")
	await page.waitFor(1000 * 1.5)
	await ((): Promise<void> => {
		return new Promise(res => {
			const timeoutId = setInterval(async () => {
				if (page.isClosed()) clearInterval(timeoutId)
				if (await page.evaluate(() => Game && Game.ready)) {
					clearInterval(timeoutId)
					res()
				}
			}, 100)
		})
	})()
	await page.evaluate(() => {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				Game.LoadMod("http://localhost:5501/dist/index.js")
				if (!globalThis.CPPKIES_ONLOAD) globalThis.CPPKIES_ONLOAD = []
				globalThis.CPPKIES_ONLOAD.push(() => resolve())
			}, 1000)
		})
	})

	// Transfer Game and Cppkies into global scope
	//globalThis.Game = await page.evaluate(() => globalThis.Game)
	//globalThis.Cppkies = await page.evaluate(() => globalThis.Cppkies)
}
