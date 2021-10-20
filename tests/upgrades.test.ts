import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(({ page }) => setupPage(page))

test("Should be able to create upgrades", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Upgrade(
					"Test upgrade",
					"Test upgrade<q>Hi there</q>",
					12345,
					[12, 34]
				) instanceof Cppkies.Upgrade
		)
	).toBeTruthy()
})

test("Should load upgrade data on reload", async ({ page }) => {
	await page.evaluate(() => {
		new Cppkies.Upgrade(
			"Test save upgrade",
			"Test upgrade<q>Hi there</q>",
			12345,
			[12, 34]
		).bought = true
		Game.WriteSave()
	})

	await setupPage(page)

	expect(
		await page.evaluate(
			() =>
				new Cppkies.Upgrade(
					"Test save upgrade",
					"Test upgrade<q>Hi there</q>",
					12345,
					[12, 34]
				).bought
		)
	).toBeTruthy()
})

test("Should be able to convert string to building", async ({ page }) => {
	// Choose a random id between 0 and 10
	const id = Math.floor(Math.random() * 10)
	expect(
		await page.evaluate(
			(id: number) =>
				new Cppkies.TieredUpgrade(
					"Tiered test",
					"Hi there",
					Game.ObjectsById[id].name,
					1
				).buildingTie.id,
			id
		)
	).toBe(id)
})

test("Should be able to correctly assign grandma upgrades to buildings", async ({
	page,
}) => {
	expect(
		await page.evaluate(() => {
			new Cppkies.GrandmaSynergy("Tiered test", "Oh hi", "Grandma")
			return !!Game.Objects.Grandma.grandma
		})
	).toBeTruthy()
})
