import babel from "rollup-plugin-babel"
import analyze from "rollup-plugin-analyzer"
import minify from "rollup-plugin-babel-minify"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

const production = process.env.NODE_ENV === "production"
//import banner from "rollup-plugin-banner"
export default {
	input: ["./src/index.ts"],
	output: {
		name: "Cppkies",
		file: "./dist/index.js",
		format: "umd",
		sourcemap: true,
	},
	plugins: [
		typescript({
			tsconfig: production ? "./tsconfig.json" : "./tsconfig.dev.json",
		}),
		json(),
		babel({
			exclude: "node_modules/**",
			sourceMaps: true,
		}),
		resolve(),
		commonjs(),
		analyze({
			summaryOnly: true,
		}),
		production
			? minify({
					comments: false,
			  })
			: undefined,
	],
}
