<script lang="ts">
	export let active = false;
	export let disabled = false;
	export let theme: 'zinc' | 'green' = 'zinc';
</script>

<button
	type="button"
	class="btn"
	class:btn-zinc={theme === 'zinc'}
	class:btn-green={theme === 'green'}
	class:active
	class:disabled
	on:click>
	<slot />
</button>

<style>
	.btn {
		@apply px-4 py-1.5 shadow-sm hover:shadow-md border rounded-md text-center;
	}

	.btn.disabled {
		@apply hover:shadow-sm cursor-default;
	}

	.btn.btn-zinc:not(.active) {
		@apply text-black bg-white border-zinc-300 hover:border-zinc-600;
	}

	.btn.btn-zinc.active {
		@apply text-white bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-900 border-zinc-900;
	}

	.btn.btn-green:not(.disabled) {
		@apply text-white bg-green-700 hover:bg-green-800 active:bg-green-900 border-green-900;
	}

	.btn.btn-green.disabled {
		@apply text-gray-400 bg-gray-50  border-gray-300;
	}
</style>
