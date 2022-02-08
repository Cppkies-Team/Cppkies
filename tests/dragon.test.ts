import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await setupPage(page)
	await page.evaluate(() => {
		Game.RuinTheFun()
		Game.dragonLevel = 0
	})
})

test.describe("Dragon levels", () => {
	test("Should be able to process leveling up with custom levels", async ({
		page,
	}) => {
		expect(
			await page.evaluate(
				() =>
					new Cppkies.DragonLevel(
						"Cool level",
						"Help",
						"Nothing!",
						() => true,
						() => {}
					) instanceof Cppkies.DragonLevel
			)
		).toBe(true)
	})
	test("Should insert the dragon level at the correct position", async ({
		page,
	}) => {
		const [ogCostStr, ogAction] = await page.evaluate(() => {
			const currentLevel = Game.dragonLevels[Game.dragonLevel]
			return [currentLevel.costStr(), currentLevel.action]
		})
		expect(
			await page.evaluate(() => {
				new Cppkies.DragonLevel(
					null,
					"Does nothing",
					"Nothing!",
					() => true,
					() => {},
					null,
					1
				)
				const currentLevel = Game.dragonLevels[Game.dragonLevel]
				return [currentLevel.costStr(), currentLevel.action]
			})
		).toStrictEqual(["Nothing!", "Does nothing"])

		expect(
			await page.evaluate(() => {
				Game.UpgradeDragon()
				const currentLevel = Game.dragonLevels[Game.dragonLevel]
				return [currentLevel.costStr(), currentLevel.action]
			})
		).toStrictEqual([ogCostStr, ogAction])
	})
})

/*
test.describe("Dragon auras", () => {
	test("Should be able to create auras", async ({ page }) => {
		expect(
			await page.evaluate(
				() =>
					new Cppkies.DragonAura("Cool aura", "Does <b>cool</b> stuff.", [
						0,
						0,
					]) instanceof Cppkies.DragonAura
			)
		).toBe(true)
	})
	test("Should insert the dragon level at the correct position", async ({
		page,
	}) => {
		const [ogCostStr, ogAction] = await page.evaluate(() => {
			const currentLevel = Game.dragonLevels[Game.dragonLevel]
			return [currentLevel.costStr(), currentLevel.action]
		})
		expect(
			await page.evaluate(() => {
				new Cppkies.DragonLevel(
					null,
					"Does nothing",
					"Nothing!",
					() => true,
					() => {},
					null,
					1
				)
				const currentLevel = Game.dragonLevels[Game.dragonLevel]
				return [currentLevel.costStr(), currentLevel.action]
			})
		).toStrictEqual(["Nothing!", "Does nothing"])

		expect(
			await page.evaluate(() => {
				Game.UpgradeDragon()
				const currentLevel = Game.dragonLevels[Game.dragonLevel]
				return [currentLevel.costStr(), currentLevel.action]
			})
		).toStrictEqual([ogCostStr, ogAction])
	})
})
 */
