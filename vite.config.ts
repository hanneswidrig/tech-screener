import Icons from "unplugin-icons/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), Icons({ compiler: "svelte" })],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
