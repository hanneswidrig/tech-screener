/** @type {import('prettier').Options} */
module.exports = {
	bracketSameLine: true,
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	pluginSearchDirs: ["."],
	plugins: [require("prettier-plugin-tailwindcss")],
	printWidth: 100,
	tabWidth: 4,
	trailingComma: "all",
	useTabs: true,
};
