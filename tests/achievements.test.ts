import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => setupPage(page))

test("Should be able to create achievements", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Achievement(
					"Test achievement",
					"Test achievement<q>Hi there</q>",
					[12, 34]
				) instanceof Cppkies.Achievement
		)
	).toBeTruthy()
})

test("Should load achievement data on reload", async ({ page }) => {
	await page.evaluate(() => {
		new Cppkies.Achievement(
			"Test save achievement",
			"Test achievement<q>Hi there</q>",
			[12, 34]
		).won = 1
		Game.WriteSave()
	})

	await setupPage(page)

	expect(
		await page.evaluate(
			() =>
				new Cppkies.Achievement(
					"Test save achievement",
					"Test achievement<q>Hi there</q>",
					[12, 34]
				).won
		)
	).toBeTruthy()
})

test("Should be able to create special tiered", async ({ page }) => {
	expect(
		await page.evaluate(() => {
			const achievement = new Cppkies.TieredAchievement(
				"Test achievement",
				null,
				"Cursor",
				"cursor2"
			)
			return [achievement.icon, achievement.desc]
		})
	).toMatchObject([[0, 6, ""], "Have <b>2</b> cursors."])
})
