<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 shadow-md bg-white">
	<nav class="max-w-5xl mx-auto">
		<ul class="flex gap-8 p-4">
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Dashboard</a></li>
		</ul>
	</nav>
</header>

<style>
	li:hover {
		@apply underline;
	}

	li.active {
		@apply font-bold;
	}
</style>
