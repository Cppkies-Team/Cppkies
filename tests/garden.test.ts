/* eslint-disable @typescript-eslint/no-var-requires */
import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

import { writeFileSync } from "fs"

test.beforeEach(async ({ page }) => {
	await setupPage(page)
	await page.evaluate(() => {
		Game.RuinTheFun()
		Game.Upgrades["Turbo-charged soil"].lose()
		Game.Objects.Farm.buy(1)
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Farm
	})
})

test("Should be able to create garden plants", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Plant(
					"Barberry",
					"barberry",
					[0, 0],
					60 * 60 * 24 * 365 * 1000,
					5,
					0,
					0.01,
					99,
					'<div class="green">&bull; You can make a cool drink out of it</div>',
					"Neat plant"
				) instanceof Cppkies.Plant
		)
	).toBeTruthy()
})

test("Should load garden plot data", async ({ page }) => {
	await page.evaluate(() => {
		const plant = new Cppkies.Plant(
			"Fungymush",
			"fungymush",
			[0, 0],
			60,
			Number.MAX_SAFE_INTEGER,
			10,
			5,
			80,
			`<div class="green">&bull; You can make soup</div>
<div class="red">&bull; It makes you angry</div>`,
			"This one is mushy"
		)
		plant.fungus = true
		const mg = Game.Objects.Farm.minigame
		mg.seedSelected = plant.id
		mg.clickTile(1, 1)
		Game.WriteSave()
	})

	await setupPage(page)

	await page.evaluate(() => {
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Farm
	})

	const [plantId, tileId] = await page.evaluate(() => {
		const plant = new Cppkies.Plant(
			"Fungymush",
			"fungymush",
			[0, 0],
			60,
			Number.MAX_SAFE_INTEGER,
			10,
			5,
			80,
			`<div class="green">&bull; You can make soup</div>
<div class="red">&bull; It makes you angry</div>`,
			"This one is mushy"
		)
		plant.fungus = true
		const mg = Game.Objects.Farm.minigame
		return [plant.id, mg.plot[1][1][0] - 1]
	})
	if (tileId !== plantId) {
		writeFileSync(
			"./gaming.json",
			JSON.stringify(
				await page.evaluate(() => {
					const mg = Game.Objects.Farm.minigame
					//@ts-expect-error I don't care
					delete mg.parent
					return mg
				})
			)
		)
	}
	expect(tileId).toBe(plantId)
})

test("Should load garden seed data", async ({ page }) => {
	await page.evaluate(() => {
		const plant = new Cppkies.Plant(
			"Grass",
			"grass",
			[0, 0],
			3600,
			12_000_000_000_00,
			4,
			1,
			75,
			`<div class="green">&bull; It smells nice</div>
<div class="red">&bull; You have to cut it every once it a while</div>`,
			"Grass. What do you expect??"
		)
		const mg = Game.Objects.Farm.minigame
		mg.seedSelected = plant.id
		mg.clickTile(1, 1)
		mg.plot[1][1][1] = 90
		mg.clickTile(1, 1)
		Game.WriteSave()
	})
	expect(
		await page.evaluate(() => {
			const mg = Game.Objects.Farm.minigame
			return mg.plants["grass"].unlocked
		})
	).toBeTruthy()

	await setupPage(page)

	await page.evaluate(() => {
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Farm
	})

	expect(
		await page.evaluate(() => {
			const plant = new Cppkies.Plant(
				"Grass",
				"grass",
				[0, 0],
				3600,
				12_000_000_000_00,
				4,
				1,
				75,
				`<div class="green">&bull; It smells nice</div>
<div class="red">&bull; You have to cut it every once it a while</div>`,
				"Grass. What do you expect??gaming help i am very cool I am very "
			)
			return plant.unlocked
		})
	).toBeTruthy()
})
