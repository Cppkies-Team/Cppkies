module.exports = {
	launch: {
		headless: false,
		slowMo: false,
		devtools: true,
	},
	server: {
		command: `npx http-server --port 5501`,
		launchTimeout: 50000,
		port: 5501,
	},
}
