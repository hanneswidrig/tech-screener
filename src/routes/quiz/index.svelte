<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Question from '$lib/Question.svelte';
	import { activeTopics, activeTopic, quiz, questions } from '$lib/store/quiz';

	$: console.log($quiz);

	onMount(() => {
		const selectedTopics = $page.url.searchParams.getAll('topic');
		activeTopics.set(selectedTopics);
		activeTopic.update($page.url.searchParams.get('selected') ?? selectedTopics[0]);
	});
</script>

<div class="flex justify-end mb-4">
	<Button theme="zinc" on:click={() => quiz.resetTopic($activeTopic)}>Reset</Button>
</div>

<div class="flex flex-col gap-4">
	{#each $questions as question (question.id)}
		<Question {question} />
	{/each}
</div>
