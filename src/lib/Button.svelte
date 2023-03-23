<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";
	import { cs } from "./utils";

	export let active = false;
	export let disabled = false;
	export let theme: "zinc" | "green" = "zinc";
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button
	class={cs(
		`rounded-md border px-4 py-1.5 text-center shadow-sm`,
		`hover:shadow-md disabled:cursor-default disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:shadow-sm`,
		`[&:not(:disabled).green]:border-green-900 [&:not(:disabled).green]:bg-green-700 [&:not(:disabled).green]:text-white`,
		`[&:not(:disabled).green]:hover:bg-green-800 [&:not(:disabled).green]:active:bg-green-900`,
		`[&:not(:disabled).zinc]:border-zinc-300 [&:not(:disabled).zinc]:bg-white [&:not(:disabled).zinc]:text-black`,
		`[&:not(:disabled).zinc]:hover:border-zinc-600`,
		`[&:not(:disabled).zinc.active]:border-zinc-900 [&:not(:disabled).zinc.active]:bg-zinc-700 [&:not(:disabled).zinc.active]:text-white`,
		`[&:not(:disabled).zinc.active]:hover:bg-zinc-800`,
	)}
	class:active
	class:green={theme === "green"}
	class:zinc={theme === "zinc"}
	{disabled}
	type="button"
	on:click={(event) => !disabled && onClick(event)}>
	<slot />
</button>
