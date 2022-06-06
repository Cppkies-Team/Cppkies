/* eslint-disable @typescript-eslint/no-var-requires */
import setupPage from "./setup-page"
import { test, expect, Page } from "@playwright/test"
import type { CppkiesPlot } from ".."

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

function setupGarden(page: Page, plot: CppkiesPlot) {
	return page.evaluate(plot => {
		const mg = Game.Objects.Farm.minigame
		mg.harvestAll()
		for (let y = 0; y < plot.length; y++) {
			for (let x = 0; x < plot[y].length; x++) {
				if (!mg.plot[y][x]) continue
				const newPlot = plot[y][x]
				if (newPlot === null) {
					mg.plot[y][x] = [0, 0]
				} else {
					const plant = mg.plants[newPlot[0]]
					if (!plant) {
						console.warn(`Missing plant ${newPlot[0]}`)
						continue
					}
					mg.plot[y][x] = [plant.id + 1, newPlot[1]]
				}
			}
		}
	}, plot)
}

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

test("Should handle mutations", async ({ page }) => {
	await page.evaluate(() => {
		new Cppkies.Plant(
			"Mutation plant 1",
			"src",
			[0, 0],
			1,
			1,
			50,
			0,
			10,
			{},
			"src"
		)
		new Cppkies.Plant(
			"Mutation plant 2",
			"dist",
			[0, 0],
			1,
			1,
			50,
			0,
			10,
			{},
			"dist"
		)
		new Cppkies.PlantMutation({ src: ">0" }, [["dist", 1]])
	})
	await setupGarden(page, [
		[null, null, null],
		[null, ["src", 40], null],
		[null, null, null],
	])
	await page.evaluate(() => {
		const mg = Game.Objects.Farm.minigame
		// Force a tick
		mg.nextStep = -1
		mg.logic?.()
	})
	const plot: CppkiesPlot = await page.evaluate(() => {
		// Truncate it to the first 3x3 area, as that is where everything should've taken place
		const mg = Game.Objects.Farm.minigame
		return mg.plot
			.filter((_, i) => i <= 2)
			.map(val => val.filter((_, i) => i <= 2))
			.map(val =>
				val.map<[string, number] | null>(val =>
					val[0] === 0 ? null : [mg.plantsById[val[0] - 1].key, val[1]]
				)
			)
	})
	expect(plot).toStrictEqual([
		[
			["dist", 0],
			["dist", 0],
			["dist", 0],
		],
		[
			["dist", 0],
			["src", 90],
			["dist", 0],
		],
		[
			["dist", 0],
			["dist", 0],
			["dist", 0],
		],
	])
})
