<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from '$lib/Button.svelte';
	import { scoreSheet, scoreSheetPercentGrade } from '$lib/store/scoreSheet';

	$: console.log($scoreSheet);

	async function goToDashboard(): Promise<void> {
		scoreSheet.clear();

		if ($page.url.pathname !== '/') {
			return goto('/');
		}
	}
</script>

<Button theme="zinc" active={$page.url.pathname === '/'} on:click={() => goToDashboard()}>Dashboard</Button>

<progress class="w-full mt-2" value={$scoreSheetPercentGrade} max="100" />
