<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from '$lib/Button.svelte';
</script>

<Button theme="zinc" active={$page.url.pathname === '/'} on:click={() => goto('/')}>Dashboard</Button>
