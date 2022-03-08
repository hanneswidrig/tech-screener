<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Question from '$lib/Question.svelte';
	import { replaceStateWithQuery } from '$lib/utils';
	import { questionBank } from '$lib/data/question-bank';
	import { technologyGroups } from '$lib/data/technology-group';
	import type { QuizQuestion } from '$lib/types/Question.type';

	const selectedCategories = $page.url.searchParams.getAll('category');
	const technologies = technologyGroups().flatMap(({ items }) => items);

	let selectedCategory: string;

	$: selectedQuestionBank =
		selectedCategory === 'csharp'
			? questionBank().csharp.map(({ question, answer }): QuizQuestion => ({ question, answer, selected: '' }))
			: [];

	onMount(() => {
		updateActiveCategory($page.url.searchParams.get('selected') ?? selectedCategories[0]);
	});

	function updateActiveCategory(itemKey: string): void {
		selectedCategory = itemKey;
		replaceStateWithQuery({ selected: itemKey });
	}

	function getCategoryLabel(itemKey: string): string {
		return technologies.find(({ key }) => key === itemKey)?.label ?? '';
	}
</script>

<div class="flex flex-wrap justify-center">
	{#each selectedCategories as itemKey}
		<Button theme="zinc" active={selectedCategory === itemKey} on:click={() => updateActiveCategory(itemKey)}>
			{getCategoryLabel(itemKey)}
		</Button>
	{/each}
</div>

{#if selectedQuestionBank.length > 0}
	<section class="card">
		<div class="flex flex-col p-4 space-y-12">
			{#each selectedQuestionBank as question}
				<Question {question} />
			{/each}
		</div>
	</section>
{/if}

<style>
	.card {
		@apply flex flex-col bg-white shadow-sm rounded-md border border-gray-300;
	}
</style>
