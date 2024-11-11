<script lang="ts">
	import { onMount } from "svelte";

	import { page } from "$app/stores";
	import { quiz } from "$lib/store/quiz";
	import Button from "$lib/Button.svelte";
	import Question from "$lib/Question.svelte";
	import { questions, readOnlyQuestions } from "$lib/store/questions";
	import { activeTopic, activeTopics } from "$lib/store/active-topic";

	let searchParams = $derived($page.url.searchParams);

	onMount(() => {
		const selectedTopics = searchParams.getAll("topic");
		activeTopics.set(selectedTopics);
		activeTopic.update(searchParams.get("selected") ?? selectedTopics[0]);
	});
</script>

<div class="mb-4 flex justify-between">
	<div>
		<Button onClick={() => questions.expandAll($activeTopic)}>Expand All</Button>
		<Button onClick={() => questions.collapseAll($activeTopic)}>Collapse All</Button>
	</div>
	<div>
		<Button onClick={() => quiz.resetTopic($activeTopic)}>Reset</Button>
	</div>
</div>

<div class="flex flex-col gap-4">
	{#each $readOnlyQuestions as question (question.id)}
		<Question {question} expanded={question.expanded} />
	{/each}
</div>
