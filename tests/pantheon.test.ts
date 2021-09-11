import preparePage, { waitFor } from "./setup-page"

beforeAll(async () => {
	await preparePage(page)
	await page.evaluate(() => {
		Game.RuinTheFun(false)
		Game.Objects.Temple.buy(1)
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Temple
	})
})

it("Should be able to create pantheon spirits", async () => {
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

it("Should load spirit save data data on reload", async () => {
	// Reset the page to reset the ID
	await preparePage(page)
	await page.evaluate(() => {
		Game.RuinTheFun(false)
		Game.Objects.Temple.buy(1)
		Game.LoadMinigames()
		return Cppkies.minigamePromises.Temple
	})
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

	// Wait for save
	await waitFor(1500)

	await preparePage(page)

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
