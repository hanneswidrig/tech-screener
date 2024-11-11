<script lang="ts">
	import { calculateScore } from "$lib/utils";
	import { quiz as quizLegacy, type QuizAnswer } from "$lib/store/quiz";

	function getTotalScore(quizAnswers: QuizAnswer[]): number {
		if (quizAnswers.length > 0) {
			const scores = quizAnswers.map(({ grade }) => calculateScore(grade));
			const currentScore = scores.reduce((prev, curr) => prev + curr, 0);
			const maxScore = quizAnswers.length * calculateScore("A");
			const percentage = Math.round((currentScore / maxScore) * 100);
			return percentage;
		}

		return -1;
	}

	function getSummaryTheme(score: number): string {
		if (70 <= score) {
			return "bg-green-600 border-green-600";
		} else if (50 <= score && score < 70) {
			return "bg-yellow-600 border-yellow-600";
		} else if (0 <= score && score < 50) {
			return "bg-red-600 border-red-600";
		}

		return "bg-zinc-600 border-zinc-600";
	}

	let totalScore = $derived(getTotalScore($quizLegacy));
	let summaryTheme = $derived(getSummaryTheme(totalScore));
</script>

<div
	class="mt-4 flex flex-col items-center rounded-md border border-zinc-300 p-4 text-white {summaryTheme}">
	{#if totalScore >= 0}
		<span class="text-4xl">{totalScore}%</span>
	{:else}
		<span class="text-4xl">TBD</span>
	{/if}
</div>
