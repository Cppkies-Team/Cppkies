import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await setupPage(page)
	await page.evaluate(() => {
		Game.RuinTheFun()
		Game.Objects.Temple.buy(1)
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Temple
	})
})

test("Should be able to create pantheon spirits", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Spirit("jest", "test", [0, 0], {
					1: '<span class="green">You get very good on-push tests.</span>',
					2: '<span class="green">You get mediocre manually-ran tests.</span>',
					3: '<span class="green">You get tests which is just an HTML file you play with.</span>',
					after: '<span class="red">It takes longer to deploy.</span>',
				}) instanceof Cppkies.Spirit
		)
	).toBeTruthy()
})

test("Should load spirit save data data on reload", async ({ page }) => {
	await page.evaluate(() => {
		const savingGod = new Cppkies.Spirit("Cppkies saves", "saving", [0, 0], {
			1: '<span class="green">You save stuff.</span>',
			2: '<span class="green">You save stuff but it\' not good.</span>',
			3: '<span class="green">You save stuff but it sucks.</span>',
			after: '<span class="red">The bundle takes more size.</span>',
		})
		Cppkies.slotGod(savingGod, -1)
		Cppkies.slotGod(savingGod, 0)
		Game.WriteSave()
	})

	await setupPage(page)

	await page.evaluate(() => {
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Temple
	})

	expect(
		await page.evaluate(
			() =>
				new Cppkies.Spirit("Cppkies saves", "saving", [0, 0], {
					1: '<span class="green">You save stuff.</span>',
					2: '<span class="green">You save stuff but it\' not good.</span>',
					3: '<span class="green">You save stuff but it sucks.</span>',
					after: '<span class="red">The bundle takes more size.</span>',
				}).slot
		)
	).toBe(0)
})
