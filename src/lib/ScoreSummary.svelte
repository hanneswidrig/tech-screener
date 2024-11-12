<script lang="ts">
	import { quiz } from "$lib/store/quiz.svelte";

	let containerClasses = $derived.by(() => {
		if (70 <= quiz.totalScore) {
			return "bg-green-600 border-green-600";
		}

		if (50 <= quiz.totalScore && quiz.totalScore < 70) {
			return "bg-yellow-600 border-yellow-600";
		}

		if (0 <= quiz.totalScore && quiz.totalScore < 50) {
			return "bg-red-600 border-red-600";
		}

		return "bg-zinc-600 border-zinc-600";
	});
</script>

<div
	class="mt-4 flex flex-col items-center rounded-md border border-zinc-300 p-4 text-white {containerClasses}">
	{#if quiz.totalScore >= 0}
		<span class="text-4xl">{quiz.totalScore}%</span>
	{:else}
		<span class="text-4xl">TBD</span>
	{/if}
</div>
