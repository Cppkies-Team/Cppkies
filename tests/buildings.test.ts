import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(({ page }) => setupPage(page))

test("Should be able to create buildings", async ({ page }) => {
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

test("Should warn on invalid icon", async ({ page }) => {
	// Override warns

	expect(
		(
			await page.evaluate(() => {
				const warnLog: string[] = []
				console.warn = new Proxy(console.warn, {
					apply: (target, thisArg, args): void => {
						Reflect.apply(target, thisArg, args)
						warnLog.push(args[0])
					},
				})
				new Cppkies.Building(
					"Test building 2",
					"test|tests|tested|[X] more test|[X] more tests",
					"Test",
					[0, 1],
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
				return warnLog
			})
		).includes(
			"All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=relink-column"
		)
	).toBe(true)
})

test("Should load data on reload", async ({ page }) => {
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

	await setupPage(page)

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
