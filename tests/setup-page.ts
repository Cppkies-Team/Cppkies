import { setupCookieClickerPage } from "cookie-connoisseur"
import { Page } from "playwright"

async function setupPage(page: Page): Promise<void> {
	await setupCookieClickerPage(page)
	await page.evaluate(() => Game.LoadMod("https://cppkies.local/index.js"))
	await page.waitForFunction(() => window.Cppkies !== undefined)
	await page.evaluate(() => Cppkies.deffer)
}

export default setupPage
