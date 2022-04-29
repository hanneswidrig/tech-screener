<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { quiz } from '$lib/store/quiz';
	import Button from '$lib/Button.svelte';
	import ScoreSummary from '$lib/ScoreSummary.svelte';
	import TopicSwitcher from '$lib/TopicSwitcher.svelte';

	async function goToDashboard(): Promise<void> {
		quiz.clear();

		if ($page.url.pathname !== '/') {
			return goto('/');
		}
	}
</script>

<div class="h-full flex flex-col">
	<Button theme="zinc" active={$page.url.pathname === '/'} on:click={() => goToDashboard()}>Dashboard</Button>

	<div class="w-full h-px my-4 bg-zinc-300" />

	{#if $page.url.pathname.includes('/quiz')}
		<div class="h-full flex flex-col justify-between">
			<TopicSwitcher />
			<ScoreSummary />
		</div>
	{/if}
</div>
