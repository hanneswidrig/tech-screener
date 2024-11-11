<script lang="ts">
	import { onMount } from "svelte";

	import { page } from "$app/stores";
	import { quiz as quizLegacy } from "$lib/store/quiz";
	import Button from "$lib/Button.svelte";
	import Question from "$lib/Question.svelte";
	import { questions as questionsLegacy } from "$lib/store/questions";
	import { topic } from "$lib/store/topic.svelte";

	let searchParams = $derived($page.url.searchParams);

	let activeQuestions = $derived(
		$questionsLegacy.filter(({ topicId }) => topicId === topic.active),
	);

	onMount(() => {
		topic.all = searchParams.getAll("topic");
		topic.setActive(searchParams.get("selected"));
	});
</script>

<div class="mb-4 flex justify-between">
	<div>
		<Button onClick={() => questionsLegacy.expandAll(topic.active)}>Expand All</Button>
		<Button onClick={() => questionsLegacy.collapseAll(topic.active)}>Collapse All</Button>
	</div>
	<div>
		<Button onClick={() => quizLegacy.resetTopic(topic.active)}>Reset</Button>
	</div>
</div>

<div class="flex flex-col gap-4">
	{#each activeQuestions as question (question.id)}
		<Question {question} expanded={question.expanded} />
	{/each}
</div>
