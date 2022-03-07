<script lang="ts">
	import type { Technology } from 'src/types/Quiz.type';
	import MdiChevronDown from 'virtual:icons/mdi/chevron-down';
	import Question from '$lib/Question.svelte';

	export let section: Technology;
	let expanded = false;
</script>

<section class="card border border-gray-300" class:expanded>
	<div class="card-header" class:expanded on:click={() => (expanded = !expanded)}>
		<h1 class="font-medium text-2xl">{section.label}</h1>
		<MdiChevronDown class="text-2xl" transform="rotate({expanded ? 180 : 0})" />
	</div>
	<div class="flex p-4" class:hidden={!expanded}>
		<Question />
	</div>
</section>

<style>
	.card {
		@apply flex flex-col bg-white shadow-md rounded-md;
	}

	.card-header {
		@apply w-full flex justify-between cursor-pointer p-4;
	}

	.card-header.expanded {
		@apply border-b border-gray-300;
	}
</style>
