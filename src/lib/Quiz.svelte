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
		@apply font-medium rounded-full text-sm px-4 py-1.5 text-center mr-2 mb-4;
	}

	.btn:not(.active) {
		@apply text-black bg-white hover:bg-gray-100 border border-gray-200;
	}

	.btn.active {
		@apply text-white bg-gray-700 hover:bg-gray-800 border border-gray-900;
	}
</style>
