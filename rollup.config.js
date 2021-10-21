import analyze from "rollup-plugin-analyzer"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import path from "path"
import fs from "fs"

const production = process.env.NODE_ENV === "production"
const esmDebugging = process.env.CPPKIES_ESM_DEBUGGING === "yes"

const plugins = [
	resolve({ browser: true }),
	commonjs(),
	typescript({
		tsconfig: production ? "./tsconfig.json" : "./tsconfig.dev.json",
	}),
	json(),
	analyze({
		summaryOnly: true,
	}),
	production ? terser() : undefined,
]

function getFilesRecursive(dir) {
	const files = []
	fs.readdirSync(dir).forEach(file => {
		if (/\.d\.ts$/.test(file)) return
		const absolute = path.join(dir, file)
		if (fs.statSync(absolute).isDirectory())
			files.push(...getFilesRecursive(absolute))
		else files.push(absolute)
	})
	return files
}

//import banner from "rollup-plugin-banner"
export default [
	...(!esmDebugging
		? [
				{
					input: ["./src/index.ts"],
					output: {
						name: "Cppkies",
						file: "./dist/index.js",
						format: "umd",
						sourcemap: true,
					},
					plugins,
				},
		  ]
		: []),
	...(production || esmDebugging
		? [
				{
					input: getFilesRecursive("./src").map(val => `./${val}`),
					output: {
						dir: "./dist/esm",
						format: "esm",
						preserveModules: true,
						preserveModulesRoot: "src",
					},
					plugins,
					treeshake: false,
				},
		  ]
		: []),
]
