<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import { topicGroups } from '$lib/data/topic-group';

	let groups = topicGroups();

	$: disabled = groups.every(({ items }) => items.every(({ selected }) => !selected));
	$: selected = groups.flatMap(({ items }) =>
		items.filter(({ selected }) => selected).map(({ key }) => key)
	);

	function toggleActive(groupKey: string, topicKey: string): void {
		groups = groups.map((group) => {
			if (group.key === groupKey) {
				return {
					...group,
					items: group.items.map((tech) =>
						tech.key === topicKey ? { ...tech, selected: !tech.selected } : tech
					),
				};
			}

			return group;
		});
	}

	function navigateToQuiz(): Promise<void> {
		const queryParams = new URLSearchParams();

		queryParams.set('topic', selected.shift() as string);
		for (const key of selected) {
			queryParams.append('topic', key);
		}

		return goto(`quiz?${queryParams.toString()}`);
	}
</script>

<div class="flex flex-col m-4">
	<div class="flex flex-col space-y-8">
		{#each groups as group (group.key)}
			<div>
				<h1 class="text-3xl text-zinc-600 mb-4">{group.title}</h1>
				<div class="flex flex-wrap gap-2">
					{#each group.items as item (item.key)}
						<Button
							active={item.selected}
							theme="zinc"
							on:click={() => toggleActive(group.key, item.key)}
						>
							{item.label}
						</Button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="flex justify-center mt-8">
		<Button {disabled} theme="green" on:click={() => !disabled && navigateToQuiz()}
			>Start Quiz</Button
		>
	</div>
</div>
