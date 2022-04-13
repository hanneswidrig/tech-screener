<script>
	import '../app.css';

	import Sidebar from '$lib/Sidebar.svelte';
</script>

<svelte:head>
	<title>Tech Screening App</title>
</svelte:head>

<aside>
	<Sidebar />
</aside>

<main>
	<slot />
</main>

<style lang="postcss">
	aside {
		@apply flex flex-col w-64 p-4 h-screen bg-white;
	}

	main {
		@apply flex-1 p-4 h-screen overflow-y-scroll;
	}
</style>
