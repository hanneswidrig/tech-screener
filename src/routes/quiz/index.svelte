<script lang="ts">
	import { onMount } from 'svelte';

	import { replaceStateWithQuery } from '$lib/utils';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';

	const selectedCategories = $page.url.searchParams.getAll('category');

	let activeCategory: string;

	onMount(() => {
		updateActiveCategory($page.url.searchParams.get('selected') ?? selectedCategories[0]);
	});

	function updateActiveCategory(selectedCategory: string): void {
		activeCategory = selectedCategory;
		replaceStateWithQuery({ selected: selectedCategory });
	}
</script>

<div class="flex flex-wrap justify-center">
	{#each selectedCategories as category}
		<Button theme="zinc" selected={activeCategory === category} on:click={() => updateActiveCategory(category)}>
			{category}
		</Button>
	{/each}
</div>
