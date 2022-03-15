<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Question from '$lib/Question.svelte';
	import { activeTopics, activeTopic, activeTopicQuestions } from '$lib/store/quiz';

	onMount(() => {
		const selectedTopics = $page.url.searchParams.getAll('topic');
		activeTopics.set(selectedTopics);
		activeTopic.update($page.url.searchParams.get('selected') ?? selectedTopics[0]);
	});
</script>

<div class="flex flex-col overflow-auto">
	{#if $activeTopicQuestions.length > 0}
		<section class="card">
			<div class="flex flex-col p-4 space-y-12">
				{#each $activeTopicQuestions as question (question.id)}
					<Question {question} />
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
