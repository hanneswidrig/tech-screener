<script lang="ts">
	import Button from "$lib/Button.svelte";
	import { calculateScore } from "$lib/utils/calculate_score";
	import { topicGroups } from "$lib/data/topic-group";
	import { quiz } from "$lib/store/quiz.svelte";
	import { topic } from "$lib/store/topic.svelte";

	const topics = topicGroups().flatMap(({ items }) => items);

	function findTopicLabel(topic: string): string {
		return topics.find(({ key }) => key === topic)?.label ?? "";
	}

	function getScoreByTopic(topic: string): string {
		const answeredQuestionsByTopic = quiz.answers.filter(({ topicId }) => topicId === topic);
		if (answeredQuestionsByTopic.length > 0) {
			const scores = answeredQuestionsByTopic.map(({ grade }) => calculateScore(grade));
			const currentScore = scores.reduce((prev, curr) => prev + curr, 0);
			const maxScore = answeredQuestionsByTopic.length * calculateScore("A");
			const percentage = Math.round((currentScore / maxScore) * 100);
			return `${percentage}%`;
		}

		return "TBD";
	}
</script>

<div class="mt-4 flex flex-col gap-2">
	{#each topic.all as key (key)}
		<Button selected={topic.isActive(key)} onClick={() => topic.setActive(key)}>
			<div class="flex justify-between">
				<span class="text-left">{findTopicLabel(key)}</span>
				<span class="text-right">{getScoreByTopic(key)}</span>
			</div>
		</Button>
	{/each}
</div>
