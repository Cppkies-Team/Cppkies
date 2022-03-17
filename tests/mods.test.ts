import setupPage from "./setup-page"
import { test, expect } from "@playwright/test"

test.beforeEach(({ page }) => setupPage(page))

test("Should be able to create mods", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Cppkies.Mod({ keyname: "testmod", version: "1.2.3" }) instanceof
				Cppkies.Mod
		)
	).toBeTruthy()
})

test("Should be able to warn and error on duplicate mod", async ({ page }) => {
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
				if (err instanceof Error) return err.message
			}
			return "Something really bad is happening here"
		})
	).toBe("You are trying to load multiple versions of the same mod")
})

test("Should load data on reload", async ({ page }) => {
	const testNumber = Math.random()
	await page.evaluate(
		testNumber =>
			new Promise<void>((res, rej) => {
				new Cppkies.Mod<{ test: number }>(
					{ keyname: "loadingtest", version: "1.2.3" },
					function () {
						this.custom = { test: testNumber }
						Game.WriteSave()
						res()
					}
				)
			}),
		testNumber
	)

	await setupPage(page)

	expect(
		await await page.evaluate(
			() =>
				new Promise((res, rej) => {
					new Cppkies.Mod<{ test: number }>(
						{ keyname: "loadingtest", version: "1.2.3" },
						function () {
							if (!this.custom) rej("This shouldn't happen")
							else res(this.custom.test)
						}
					)
				})
		)
	).toBe(testNumber)
})

test("Should create ownership links for ownable units", async ({ page }) => {
	expect(
		await page.evaluate(
			() =>
				new Promise<boolean>(res => {
					new Cppkies.Mod(
						{ keyname: "ownershiptest", version: "1.0.0" },
						function () {
							const upgrade = new Cppkies.Upgrade(
								"Cppkies 0.3",
								"Power up you CC modding with Cppkies!",
								0,
								[0, 0]
							)
							res(upgrade.owner === this)
						}
					)
				})
		)
	).toBe(true)
})

test("Should save units owned by mods to the mod's subsection of the save", async ({
	page,
}) => {
	expect(
		await page.evaluate(
			() =>
				new Promise<boolean>(res => {
					new Cppkies.Mod(
						{ keyname: "ownershipsavetest", version: "1.0.0" },
						function () {
							const upgrade = new Cppkies.Upgrade(
								"Cppkies 0.4",
								"I wonder if this will be a thing",
								0,
								[0, 0]
							)
							Game.Unlock(upgrade.name)
							Game.WriteSave()
							res(
								Cppkies.save.mods.ownershipsavetest?.upgrades?.["Cppkies 0.4"]
									.unlocked || false
							)
						}
					)
				})
		)
	).toBe(true)
})
