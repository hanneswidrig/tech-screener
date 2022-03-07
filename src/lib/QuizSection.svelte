<script lang="ts">
	import type { Technology } from 'src/types/Quiz.type';
	import type { QuizQuestion } from 'src/types/Question.type';

	import MdiChevronDown from 'virtual:icons/mdi/chevron-down';

	import { csharp } from '$lib/data/question-bank.json';
	import Question from '$lib/Question.svelte';

	export let section: Technology;
	let expanded = false;

	$: questionBank =
		section.key === 'csharp'
			? csharp.map(({ question, answer }): QuizQuestion => ({ question, answer, selected: '' }))
			: [];
</script>

<section class="card" class:expanded>
	<div class="card-header" class:expanded on:click={() => (expanded = !expanded)}>
		<h1 class="text-2xl">{section.label}</h1>
		<MdiChevronDown class="text-2xl" transform="rotate({expanded ? 180 : 0})" />
	</div>
	<div class="flex flex-col p-4 space-y-12" class:hidden={!expanded}>
		{#each questionBank as question}
			<Question {question} />
		{/each}
	</div>
</section>

<style>
	.card {
		@apply flex flex-col bg-white shadow-sm rounded-md border border-gray-300;
	}

	.card-header {
		@apply w-full flex justify-between cursor-pointer p-4;
	}

	.card-header.expanded {
		@apply border-b border-gray-300;
	}
</style>
