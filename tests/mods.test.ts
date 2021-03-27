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

it("Should load data on reload", async () => {
	const testNumber = Math.random()
	await page.evaluate(
		testNumber =>
			new Promise<void>(res => {
				new Cppkies.Mod<{ test: number }>(
					{ keyname: "loadingtest", version: "1.2.3" },
					function() {
						this.custom = { test: testNumber }
					}
				)
				Cppkies.deffer.then(() => {
					Game.WriteSave()
					res()
				})
			}),
		testNumber
	)

	// Wait for save
	await waitFor(1500)

	await preparePage(page)

	expect(
		await await page.evaluate(
			() =>
				new Promise(res => {
					new Cppkies.Mod<{ test: number }>(
						{ keyname: "loadingtest", version: "1.2.3" },
						function() {
							res(this.custom.test)
						}
					)
				})
		)
	).toBe(testNumber)
})
