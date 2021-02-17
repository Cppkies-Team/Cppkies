import { Page, Browser } from "playwright"
declare global {
	const page: Page
	const browser: Browser
	const browserName: string
	const Cppkies: typeof import("../dist")
}
