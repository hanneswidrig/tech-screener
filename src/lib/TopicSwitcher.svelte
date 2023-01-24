<script lang="ts">
	import Button from "$lib/Button.svelte";
	import { deriveScoreFromAnswer } from "$lib/utils";
	import { topicGroups } from "$lib/data/topic-group";
	import { quiz, type QuizAnswer } from "$lib/store/quiz";
	import { activeTopics, activeTopic } from "$lib/store/active-topic";

	const topics = topicGroups().flatMap(({ items }) => items);

	function getTopicLabel(itemKey: string): string {
		return topics.find(({ key }) => key === itemKey)?.label ?? "";
	}

	function getScoreByTopic(quiz: QuizAnswer[], topic: string): string {
		const answeredQuestionsByTopic = quiz.filter(({ topicId }) => topicId === topic);
		if (answeredQuestionsByTopic.length > 0) {
			const scores = answeredQuestionsByTopic.map(({ grade }) =>
				deriveScoreFromAnswer(grade),
			);
			const currentScore = scores.reduce((prev, curr) => prev + curr, 0);
			const maxScore = answeredQuestionsByTopic.length * deriveScoreFromAnswer("A");
			const percentage = Math.round((currentScore / maxScore) * 100);
			return `${percentage}%`;
		}

		return "TBD";
	}
</script>

<div class="mt-4 flex flex-col gap-2">
	{#each $activeTopics as topic (topic)}
		<Button active={$activeTopic === topic} on:click={() => activeTopic.update(topic)}>
			<div class="flex justify-between">
				<span class="text-left">{getTopicLabel(topic)}</span>
				<span class="text-right">{getScoreByTopic($quiz, topic)}</span>
			</div>
		</Button>
	{/each}
</div>
