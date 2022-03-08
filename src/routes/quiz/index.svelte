<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import { replaceStateWithQuery } from '$lib/utils';
	import { technologyGroups } from '$lib/data/technology-group';

	const selectedCategories = $page.url.searchParams.getAll('category');
	const technologies = technologyGroups().flatMap(({ items }) => items);

	let selectedCategory: string;

	onMount(() => {
		updateActiveCategory($page.url.searchParams.get('selected') ?? selectedCategories[0]);
	});

	function updateActiveCategory(itemKey: string): void {
		selectedCategory = itemKey;
		replaceStateWithQuery({ selected: itemKey });
	}

	function getCategoryLabel(itemKey: string): string {
		return technologies.find(({ key }) => key === itemKey)?.label ?? '';
	}
</script>

<div class="flex flex-wrap justify-center">
	{#each selectedCategories as itemKey}
		<Button theme="zinc" active={selectedCategory === itemKey} on:click={() => updateActiveCategory(itemKey)}>
			{getCategoryLabel(itemKey)}
		</Button>
	{/each}
</div>
