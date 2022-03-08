<script lang="ts">
	import type { TechnologyGroup } from 'src/types/Quiz.type';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';

	let groups: TechnologyGroup[] = [
		{
			key: 'programmingLanguages',
			title: 'Programming Languages',
			items: [
				{ key: 'csharp', label: 'C#', selected: false },
				{ key: 'typescript', label: 'TypeScript', selected: false },
			],
		},
		{
			key: 'jsFrameworks',
			title: 'Front End Frameworks',
			items: [
				{ key: 'react', label: 'React', selected: false },
				{ key: 'angular', label: 'Angular', selected: false },
			],
		},
	];

	$: disabled = groups.every(({ items }) => items.every(({ selected }) => !selected));
	$: selected = groups.flatMap(({ items }) => items.filter(({ selected }) => selected).map(({ key }) => key));

	function toggleActive(groupKey: string, itemKey: string): void {
		groups = groups.map((group) => {
			if (group.key === groupKey) {
				return {
					...group,
					items: group.items.map((tech) => (tech.key === itemKey ? { ...tech, selected: !tech.selected } : tech)),
				};
			}

			return group;
		});
	}

	function navigateToQuiz(): Promise<void> {
		const queryParams = new URLSearchParams();

		queryParams.set('category', selected.shift() as string);
		for (const key of selected) {
			queryParams.append('category', key);
		}

		return goto(`quiz?${queryParams.toString()}`);
	}
</script>

<div class="flex flex-col space-y-8">
	{#each groups as group (group.key)}
		<div>
			<h1 class="text-3xl text-zinc-600 mb-4">{group.title}</h1>
			{#each group.items as item (item.key)}
				<Button selected={item.selected} theme="zinc" on:click={() => toggleActive(group.key, item.key)}>
					{item.label}
				</Button>
			{/each}
		</div>
	{/each}
</div>

<div class="flex justify-center mt-8">
	<Button {disabled} theme="green" on:click={() => !disabled && navigateToQuiz()}>Start Quiz</Button>
</div>
