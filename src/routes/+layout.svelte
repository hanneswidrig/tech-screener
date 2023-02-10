<script>
	import "../app.css";

	import Sidebar from "$lib/Sidebar.svelte";
</script>

<svelte:head>
	<title>Tech Screening App</title>
</svelte:head>

<aside class="flex h-screen w-64 flex-col bg-white p-4">
	<Sidebar />
</aside>

<main class="h-screen flex-1 overflow-y-scroll p-4">
	<slot />
</main>
