import preparePage from "./setup-page"
import puppeteer, { Page } from "puppeteer"

let page: Page = null

beforeAll(async () => {
	page = await (await puppeteer.launch()).newPage()
	await preparePage(page)
})

jest.setTimeout(60000)

it("Should be able to create buildings", async () => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Building(
					"Test building",
					"test|tests|tested|[X] more test|[X] more tests",
					"Test",
					[0, 0],
					[0, 0],
					{
						bg: "bank",
						base: "bank",
					},
					Cppkies.DEFAULT_CPS,
					Cppkies.DEFAULT_ONBUY,
					{
						desc: "Test fool",
						icon: [0, 0],
						name: "Test building fool",
					},
					["Test BS", "Test BD"]
				) instanceof Cppkies.Building
		)
	).toBeTruthy()
})

it("Should warn on invalid icon", async () => {
	// Override warns

	expect(
		((await page.evaluate(() => {
			globalThis.warnLog = []
			console.warn = new Proxy(console.warn, {
				apply: (target, thisArg, args): void => {
					Reflect.apply(target, thisArg, args)
					globalThis.warnLog.push(args[0])
				},
			})
			new Cppkies.Building(
				"Test building 2",
				"test|tests|tested|[X] more test|[X] more tests",
				"Test",
				[1, 0],
				[0, 0],
				{
					bg: "bank",
					base: "bank",
				},
				Cppkies.DEFAULT_CPS,
				Cppkies.DEFAULT_ONBUY,
				{
					desc: "Test fool",
					icon: [0, 0],
					name: "Test building fool",
				},
				["Test BS", "Test BD"]
			)
			return globalThis.warnLog
		})) as string[]).includes(
			"All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"
		)
	).toBe(true)
})

it("Should load data on reload", async () => {
	await page.evaluate(() => {
		new Cppkies.Building(
			"Save test building",
			"test|tests|tested|[X] more test|[X] more tests",
			"Test",
			[0, 0],
			[0, 0],
			{
				bg: "bank",
				base: "bank",
			},
			Cppkies.DEFAULT_CPS,
			Cppkies.DEFAULT_ONBUY,
			{
				desc: "Test fool",
				icon: [0, 0],
				name: "Test building fool",
			},
			["Test BS", "Test BD"]
		).amount = 12345
		Game.WriteSave()
	})

	// Wait for save
	await page.waitFor(1000 * 1.5)

	await preparePage(page)

	expect(
		await page.evaluate(
			() =>
				new Cppkies.Building(
					"Save test building",
					"test|tests|tested|[X] more test|[X] more tests",
					"Test",
					[0, 0],
					[0, 0],
					{
						bg: "bank",
						base: "bank",
					},
					Cppkies.DEFAULT_CPS,
					Cppkies.DEFAULT_ONBUY,
					{
						desc: "Test fool",
						icon: [0, 0],
						name: "Test building fool",
					},
					["Test BS", "Test BD"]
				).amount
		)
	).toBe(12345)
})

afterAll(async () => {
	page.browser().close()
})
