<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/Button.svelte";
	import { topicGroups } from "$lib/data/topic-group";

	let groups = $state(topicGroups());

	let disabled = $derived(groups.every(({ items }) => items.every(({ selected }) => !selected)));
	let selected = $derived(
		groups.flatMap(({ items }) =>
			items.filter(({ selected }) => selected).map(({ key }) => key),
		),
	);

	function toggleActive(groupKey: string, topicKey: string): void {
		const group = groups.find((group) => group.key === groupKey);
		const item = group?.items.find((item) => item.key === topicKey);
		if (item) {
			item.selected = !item.selected;
		}

		groups = groups;
	}

	function navigateToQuiz(): Promise<void> {
		const queryParams = new URLSearchParams();

		queryParams.set("topic", selected.shift() as string);
		for (const key of selected) {
			queryParams.append("topic", key);
		}

		return goto(`quiz?${queryParams.toString()}`);
	}
</script>

<div class="m-4 flex flex-col">
	<div class="flex flex-col space-y-8">
		{#each groups as group (group.key)}
			<div>
				<h1 class="mb-4 text-3xl text-zinc-600">{group.title}</h1>
				<div class="flex flex-wrap gap-2">
					{#each group.items as item (item.key)}
						<Button
							active={item.selected}
							onClick={() => toggleActive(group.key, item.key)}>
							{item.label}
						</Button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 flex justify-center">
		<Button {disabled} theme="green" onClick={() => navigateToQuiz()}>Start Quiz</Button>
	</div>
</div>
