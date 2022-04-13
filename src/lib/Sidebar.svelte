<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { quiz } from '$lib/store/quiz';
	import Button from '$lib/Button.svelte';
	import Topics from '$lib/Topics.svelte';

	async function goToDashboard(): Promise<void> {
		quiz.clear();

		if ($page.url.pathname !== '/') {
			return goto('/');
		}
	}
</script>

<div class="flex flex-col">
	<Button theme="zinc" active={$page.url.pathname === '/'} on:click={() => goToDashboard()}>Dashboard</Button>

	<div class="w-full h-px my-4 bg-zinc-300" />

	{#if $page.url.pathname.includes('/quiz')}
		<Topics />
	{/if}
</div>
