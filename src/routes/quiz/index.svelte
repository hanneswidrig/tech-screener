<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Question from '$lib/Question.svelte';
	import { replaceStateWithQuery } from '$lib/utils';
	import { questionBank } from '$lib/data/question-bank';
	import { topicGroups } from '$lib/data/topic-group';
	import type { QuizQuestion } from '$lib/Question.type';
	import { activeTopics, quiz } from '$lib/store/quiz';

	const selectedTopics = $page.url.searchParams.getAll('topic');
	const topics = topicGroups().flatMap(({ items }) => items);

	let selectedTopic: string;

	$: selectedQuestionBank =
		selectedTopic === 'csharp'
			? questionBank().csharp.map(({ question, answer }, index): QuizQuestion => {
					return { id: `${index}`, question, answer, selected: '' };
			  })
			: [];

	$: console.log($quiz);

	onMount(() => {
		activeTopics.set(selectedTopics);
		updateActiveTopic($page.url.searchParams.get('selected') ?? selectedTopics[0]);
	});

	function updateActiveTopic(itemKey: string): void {
		selectedTopic = itemKey;
		replaceStateWithQuery({ selected: itemKey });
	}

	function getTopicLabel(itemKey: string): string {
		return topics.find(({ key }) => key === itemKey)?.label ?? '';
	}
</script>

<div class="flex flex-col overflow-auto">
	<div class="flex flex-wrap justify-center mb-4 gap-2">
		{#each selectedTopics as itemKey}
			<Button theme="zinc" active={selectedTopic === itemKey} on:click={() => updateActiveTopic(itemKey)}>
				{getTopicLabel(itemKey)}
			</Button>
		{/each}
	</div>

	{#if selectedQuestionBank.length > 0}
		<section class="card">
			<div class="flex flex-col p-4 space-y-12">
				{#each selectedQuestionBank as { id, question, answer }}
					{@const selected = $quiz.find((q) => q.questionId === id && q.topicId === selectedTopic)?.grade ?? ''}
					<Question state={{ id, question, answer, selected }} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.card {
		@apply flex flex-col bg-white shadow-sm rounded-md border border-gray-300;
	}
</style>
