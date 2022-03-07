<script lang="ts">
	import type { Technology } from 'src/types/Quiz.type';

	import QuizSection from '$lib/QuizSection.svelte';

	let technologies: Technology[] = [
		{ key: 'csharp', label: 'C#', active: false },
		{ key: 'react', label: 'React', active: false },
		{ key: 'angular', label: 'Angular', active: false },
		{ key: 'typescript', label: 'TypeScript', active: false },
	];

	$: activeTechnologies = technologies.filter(({ active }) => active);

	function toggleActive(key: string) {
		technologies = technologies.map((tech) => (tech.key === key ? { ...tech, active: !tech.active } : tech));
	}
</script>

<div class="flex flex-wrap justify-center">
	{#each technologies as { key, label, active } (key)}
		<button type="button" class="btn" class:active on:click={() => toggleActive(key)}>{label}</button>
	{/each}
</div>

<div class="flex flex-col space-y-4">
	{#each activeTechnologies as section (section.key)}
		<QuizSection {section} />
	{/each}
</div>

<style>
	.btn {
		@apply px-4 py-1.5 mr-2 mb-4 shadow-sm hover:shadow-md border rounded-md text-center;
	}

	.btn:not(.active) {
		@apply text-black bg-white border-zinc-300 hover:border-zinc-600;
	}

	.btn.active {
		@apply text-white bg-zinc-700 hover:bg-zinc-800 border-zinc-900;
	}
</style>
