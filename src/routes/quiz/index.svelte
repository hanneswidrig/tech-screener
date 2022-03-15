<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Question from '$lib/Question.svelte';
	import { activeTopics, activeTopic, quiz, questions } from '$lib/store/quiz';

	onMount(() => {
		const selectedTopics = $page.url.searchParams.getAll('topic');
		activeTopics.set(selectedTopics);
		activeTopic.update($page.url.searchParams.get('selected') ?? selectedTopics[0]);
	});

	function collapseAll() {
		questions.update((questions) => questions.map((question) => ({ ...question, expanded: false })));
	}

	function expandAll() {
		questions.update((questions) => questions.map((question) => ({ ...question, expanded: true })));
	}
</script>

<div class="flex justify-between mb-4">
	<div>
		<Button theme="zinc" on:click={() => expandAll()}>Expand All</Button>
		<Button theme="zinc" on:click={() => collapseAll()}>Collapse All</Button>
	</div>
	<div>
		<Button theme="zinc" on:click={() => quiz.resetTopic($activeTopic)}>Reset</Button>
	</div>
</div>

<div class="flex flex-col gap-4">
	{#each $questions as question (question.id)}
		<Question {question} expanded={question.expanded} />
	{/each}
</div>
