import { setupCookieClickerPage } from "cookie-connoisseur"
import { test } from "@playwright/test"

test.beforeEach(({ page }) => setupCookieClickerPage(page))

test.describe("Sanity checks", () => {
	// Really unstable for some reason
	/*it("Should reference dashnet", async () => {
		await expect(page).toMatch(/dashnet/i)
	})*/

	test("Should be able to load mods", async ({ page }) => {
		await page.evaluate(() =>
			Game.LoadMod("data:text/plain;charset=utf-8,console.log%28%22Hello%22%29")
		)
	})
	test("Should be able to load Cppkies", async ({ page }) => {
		await page.evaluate(() => Game.LoadMod("https://cppkies.local/index.js"))
		await page.waitForFunction(() => window.Cppkies !== undefined)
		await page.evaluate(() => Cppkies.deffer)
	})
})
