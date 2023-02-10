/** @type {import('prettier').Options} */
module.exports = {
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	plugins: [require("prettier-plugin-tailwindcss")],
	tabWidth: 4,
	useTabs: true,
	printWidth: 100,
	trailingComma: "all",
	bracketSameLine: true,
};
