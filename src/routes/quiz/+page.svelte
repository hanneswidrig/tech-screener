<script lang="ts">
	import { onMount } from "svelte";

	import { page } from "$app/state";
	import { quiz } from "$lib/store/quiz.svelte";
	import Button from "$lib/Button.svelte";
	import Question from "$lib/Question.svelte";
	import { questions } from "$lib/store/questions.svelte";
	import { topic } from "$lib/store/topic.svelte";

	let searchParams = $derived(page.url.searchParams);

	onMount(() => {
		topic.setAll(searchParams.getAll("topic"));
		topic.setActive(searchParams.get("selected"));
	});
</script>

<div class="mb-4 flex justify-between">
	<div>
		<Button onClick={() => questions.expandAll()}>Expand All</Button>
		<Button onClick={() => questions.collapseAll()}>Collapse All</Button>
	</div>
	<div>
		<Button onClick={() => quiz.clearActiveTopic()}>Reset</Button>
	</div>
</div>

<div class="flex flex-col gap-4">
	{#each questions.active as question (question.id)}
		<Question {question} expanded={question.expanded} />
	{/each}
</div>
