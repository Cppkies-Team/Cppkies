// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require("ts-jest/presets")

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	preset: "jest-playwright-preset",
	globals: {
		"ts-jest": {
			tsconfig: "./tests/tsconfig.json",
		},
	},
	transform: {
		...tsjPreset.transform,
	},
	moduleFileExtensions: [...["js", "json", "jsx", "ts", "tsx", "node"], "d.ts"],
	testEnvironmentOptions: { "jest-playwright": { browsers: ["chromium"] } },
}
