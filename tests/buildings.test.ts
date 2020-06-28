import "expect-puppeteer"
import preparePage from "./setup-page"
import Game from "../src/gameType"
declare let Game: Game
declare let Cppkies: typeof import("../dist").default

beforeAll(preparePage)

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
		Game.Objects["Test building"].amount = 12345
		Game.WriteSave()
	})
	page.reload()
	await preparePage()
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
				).amount
		)
	).toBe(12345)
})
