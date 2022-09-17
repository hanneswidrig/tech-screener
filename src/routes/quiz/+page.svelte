<script lang="ts">
    import { onMount } from 'svelte';

    import { page } from '$app/stores';
    import { quiz } from '$lib/store/quiz';
    import Button from '$lib/Button.svelte';
    import Question from '$lib/Question.svelte';
    import { questions, readOnlyQuestions } from '$lib/store/questions';
    import { activeTopic, activeTopics } from '$lib/store/active-topic';

    onMount(() => {
        const selectedTopics = $page.url.searchParams.getAll('topic');
        activeTopics.set(selectedTopics);
        activeTopic.update($page.url.searchParams.get('selected') ?? selectedTopics[0]);
    });
</script>

<div class="flex justify-between mb-4">
    <div>
        <Button theme="zinc" on:click={() => questions.expandAll($activeTopic)}>Expand All</Button>
        <Button theme="zinc" on:click={() => questions.collapseAll($activeTopic)}>Collapse All</Button>
    </div>
    <div>
        <Button theme="zinc" on:click={() => quiz.resetTopic($activeTopic)}>Reset</Button>
    </div>
</div>

<div class="flex flex-col gap-4">
    {#each $readOnlyQuestions as question (question.id)}
        <Question {question} expanded={question.expanded} />
    {/each}
</div>
