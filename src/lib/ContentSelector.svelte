<script lang="ts">
	import type { TechnologyGroup } from 'src/types/Quiz.type';

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
</script>

<div class="flex flex-col space-y-8">
	{#each groups as group (group.key)}
		<div>
			<h1 class="text-3xl text-zinc-600 mb-4">{group.title}</h1>
			{#each group.items as item (item.key)}
				<button
					type="button"
					class="btn btn-zinc"
					class:selected={item.selected}
					on:click={() => toggleActive(group.key, item.key)}>{item.label}</button>
			{/each}
		</div>
	{/each}
</div>

<div class="flex justify-center mt-8">
	<button type="button" class="btn btn-green flex justify-center">Start Quiz</button>
</div>

<style>
	.btn {
		@apply px-4 py-1.5 mr-2 mb-4 shadow-sm hover:shadow-md border rounded-md text-center;
	}

	.btn.btn-zinc:not(.selected) {
		@apply text-black bg-white border-zinc-300 hover:border-zinc-600;
	}

	.btn.btn-zinc.selected {
		@apply text-white bg-zinc-700 hover:bg-zinc-800 border-zinc-900;
	}

	.btn.btn-green {
		@apply text-white bg-green-700 hover:bg-green-800 active:bg-green-900 border-green-900;
	}
</style>
