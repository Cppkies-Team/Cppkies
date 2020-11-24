import preparePage from "./setup-page"
import puppeteer, { Page } from "puppeteer"

let page: Page = null

beforeAll(async () => {
	page = await (await puppeteer.launch()).newPage()
	await preparePage(page)
})

jest.setTimeout(60000)

it("Should be able to create achievements", async () => {
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

it("Should load achievement data on reload", async () => {
	await page.evaluate(() => {
		new Cppkies.Achievement(
			"Test save achievement",
			"Test achievement<q>Hi there</q>",
			[12, 34]
		).won = 1
		Game.WriteSave()
	})

	// Wait for save
	await page.waitFor(1000 * 1.5)

	await preparePage(page)

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

afterAll(async () => {
	await page.browser().close()
})
