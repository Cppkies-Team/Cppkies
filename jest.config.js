// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require("ts-jest/presets")

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	preset: "jest-puppeteer",
	globals: {
		"ts-jest": {
			tsConfig: "./tests/tsconfig.json",
		},
	},
	transform: {
		...tsjPreset.transform,
	},
}
