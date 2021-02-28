import preparePage, { waitFor } from "./setup-page"

beforeAll(async () => {
	await preparePage(page)
})

it("Should be able to create mods", async () => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Mod({ keyname: "testmod", version: "1.2.3" }) instanceof
				Cppkies.Mod
		)
	).toBeTruthy()
})

it("Should be able to warn and error on duplicate mod", async () => {
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
				new Cppkies.Mod({ keyname: "duplicate", version: "1.2.3" })
				new Cppkies.Mod({ keyname: "duplicate", version: "1.2.3" })
				return warnLog
			})
		).includes("Loading the same mod (duplicate) multiple times.")
	).toBe(true)
	expect(
		await page.evaluate<string>(() => {
			try {
				new Cppkies.Mod({ keyname: "duplicate2", version: "1.2.3" })
				new Cppkies.Mod({ keyname: "duplicate2", version: "1.2.4" })
			} catch (err) {
				return err.message
			}
		})
	).toBe("You are trying to load multiple versions of the same mod")
})

/*it("Should load data on reload", async () => {
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
	await waitFor(1500)

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
*/
