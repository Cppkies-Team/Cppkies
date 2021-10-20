// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require("ts-jest/presets")

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	globals: {
		"ts-jest": {
			tsconfig: "./tests/tsconfig.json",
		},
	},
	...tsjPreset,
	moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "d.ts"],
}
