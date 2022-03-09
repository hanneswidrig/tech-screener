<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Question from '$lib/Question.svelte';
	import { replaceStateWithQuery } from '$lib/utils';
	import { questionBank } from '$lib/data/question-bank';
	import { topicGroups } from '$lib/data/topic-group';
	import type { QuizQuestion } from '$lib/Question.type';

	const selectedTopics = $page.url.searchParams.getAll('topic');
	const topics = topicGroups().flatMap(({ items }) => items);

	let selectedCategory: string;

	$: selectedQuestionBank =
		selectedCategory === 'csharp'
			? questionBank().csharp.map(({ question, answer }): QuizQuestion => ({ question, answer, selected: '' }))
			: [];

	onMount(() => {
		updateActiveTopic($page.url.searchParams.get('selected') ?? selectedTopics[0]);
	});

	function updateActiveTopic(itemKey: string): void {
		selectedCategory = itemKey;
		replaceStateWithQuery({ selected: itemKey });
	}

	function getTopicLabel(itemKey: string): string {
		return topics.find(({ key }) => key === itemKey)?.label ?? '';
	}
</script>

<div class="flex flex-col overflow-auto">
	<div class="flex flex-wrap justify-center mb-4 gap-2">
		{#each selectedTopics as itemKey}
			<Button theme="zinc" active={selectedCategory === itemKey} on:click={() => updateActiveTopic(itemKey)}>
				{getTopicLabel(itemKey)}
			</Button>
		{/each}
	</div>

	{#if selectedQuestionBank.length > 0}
		<section class="card">
			<div class="flex flex-col p-4 space-y-12">
				{#each selectedQuestionBank as question}
					<Question state={question} />
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
