import preparePage from "./setup-page"
import { waitFor } from "./setup-page"

beforeAll(async () => {
	await preparePage(page)
})

jest.setTimeout(60000)

it("Should be able to create upgrades", async () => {
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

it("Should load upgrade data on reload", async () => {
	await page.evaluate(() => {
		new Cppkies.Upgrade(
			"Test save upgrade",
			"Test upgrade<q>Hi there</q>",
			12345,
			[12, 34]
		).bought = true
		Game.WriteSave()
	})

	// Wait for save
	await waitFor(1000 * 1.5)

	await preparePage(page)

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

it("Should be able to convert string to building", async () => {
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

it("Should be able to correctly assign grandma upgrades to buildings", async () => {
	expect(
		await page.evaluate(() => {
			new Cppkies.GrandmaSynergy("Tiered test", "Oh hi", "Grandma")
			return !!Game.Objects.Grandma.grandma
		})
	).toBeTruthy()
})
