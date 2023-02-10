<script lang="ts">
	export let active = false;
	export let disabled = false;
	export let theme: "zinc" | "green" = "zinc";
</script>

<button
	type="button"
	class="rounded-md border px-4 py-1.5 text-center shadow-sm hover:shadow-md disabled:cursor-default disabled:hover:shadow-sm"
	class:zinc={theme === "zinc"}
	class:green={theme === "green"}
	class:active
	{disabled}
	on:click>
	<slot />
</button>

<style lang="postcss">
	.zinc {
		@apply border-zinc-300 bg-white text-black hover:border-zinc-600;
	}

	.zinc.active {
		@apply border-zinc-900 bg-zinc-700 text-white hover:bg-zinc-800 active:bg-zinc-900;
	}

	.green {
		@apply border-green-900 bg-green-700 text-white hover:bg-green-800 active:bg-green-900;
	}

	.green:disabled {
		@apply border-gray-300 bg-gray-50 text-gray-400;
	}
</style>
