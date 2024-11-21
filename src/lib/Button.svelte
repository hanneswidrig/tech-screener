<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	interface Props {
		selected?: boolean;
		disabled?: boolean;
		theme?: "zinc" | "green";
		onClick: MouseEventHandler<HTMLButtonElement>;
		children?: import("svelte").Snippet;
	}

	let { selected = false, disabled = false, theme = "zinc", onClick, children }: Props = $props();

	const children_render = $derived(children);
</script>

{#if theme === "zinc"}
	<button
		class={"cursor-pointer rounded-md border border-zinc-300 bg-white px-4 py-1.5 text-center text-black shadow-xs hover:border-zinc-600 hover:shadow-md disabled:cursor-default disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:shadow-xs data-[selected=true]:border-zinc-900 data-[selected=true]:bg-zinc-700 data-[selected=true]:text-white data-[selected=true]:hover:bg-zinc-800"}
		data-selected={selected}
		{disabled}
		type="button"
		onclick={(event) => !disabled && onClick(event)}>
		{@render children_render?.()}
	</button>
{/if}

{#if theme === "green"}
	<button
		class={"cursor-pointer rounded-md border border-green-300 bg-white px-4 py-1.5 text-center text-black shadow-xs hover:border-green-600 hover:shadow-md disabled:cursor-default disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:shadow-xs data-[selected=true]:border-green-900 data-[selected=true]:bg-green-700 data-[selected=true]:text-white data-[selected=true]:hover:bg-green-800"}
		data-selected={selected}
		{disabled}
		type="button"
		onclick={(event) => !disabled && onClick(event)}>
		{@render children_render?.()}
	</button>
{/if}
