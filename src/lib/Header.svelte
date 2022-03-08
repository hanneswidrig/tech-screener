<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Button from '$lib/Button.svelte';
</script>

<header class="sticky top-0">
	<nav class="max-w-5xl mx-auto my-4">
		<Button theme="zinc" active={$page.url.pathname === '/'} on:click={() => goto('/')}>Dashboard</Button>
	</nav>
</header>
