<script lang="ts">
	import { quiz } from "$lib/store/quiz.svelte";

	function findColorScheme(score: number): string {
		if (70 <= score) {
			return "bg-green-600 border-green-600";
		}

		if (50 <= score && score < 70) {
			return "bg-yellow-600 border-yellow-600";
		}

		if (0 <= score && score < 50) {
			return "bg-red-600 border-red-600";
		}

		return "bg-zinc-600 border-zinc-600";
	}

	let colorScheme = $derived(findColorScheme(quiz.totalScore));
</script>

<div
	class="mt-4 flex flex-col items-center rounded-md border border-zinc-300 p-4 text-white {colorScheme}">
	{#if quiz.totalScore >= 0}
		<span class="text-4xl">{quiz.totalScore}%</span>
	{:else}
		<span class="text-4xl">TBD</span>
	{/if}
</div>
