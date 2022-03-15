<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { topicGroups } from '$lib/data/topic-group';
	import { activeTopics, activeTopic } from '$lib/store/quiz';

	const topics = topicGroups().flatMap(({ items }) => items);

	function getTopicLabel(itemKey: string): string {
		return topics.find(({ key }) => key === itemKey)?.label ?? '';
	}
</script>

<div class="flex flex-col gap-2">
	{#each $activeTopics as topic (topic)}
		<Button theme="zinc" active={$activeTopic === topic} on:click={() => activeTopic.update(topic)}>
			<div class="flex justify-between">
				<span class="text-left">{getTopicLabel(topic)}</span>
				<span class="text-right">0/0</span>
			</div>
		</Button>
	{/each}
</div>
