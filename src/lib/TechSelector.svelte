<script lang="ts">
	type Technology = { key: string; label: string; active: boolean };

	let technologies: Technology[] = [
		{ key: 'csharp', label: 'C#', active: false },
		{ key: 'react', label: 'React', active: false },
		{ key: 'angular', label: 'Angular', active: false },
		{ key: 'typescript', label: 'TypeScript', active: false },
	];

	function toggleActive(key: string) {
		technologies = technologies.map((tech) => (tech.key === key ? { ...tech, active: !tech.active } : tech));
	}
</script>

<div class="flex flex-wrap justify-center">
	{#each technologies as { key, label, active } (key)}
		<button type="button" class="btn" class:active on:click={() => toggleActive(key)}>{label}</button>
	{/each}
</div>

<style>
	.btn {
		@apply font-medium rounded-full text-sm px-4 py-1.5 text-center mr-2 mb-2;
	}

	.btn:not(.active) {
		@apply text-black bg-white hover:bg-red-100 border border-red-200;
	}

	.btn.active {
		@apply text-white bg-red-700 hover:bg-red-800 border border-red-900;
	}
</style>
