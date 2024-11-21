<script lang="ts">
	import "../app.css";

	import Sidebar from "$lib/Sidebar.svelte";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	const children_render = $derived(children);
</script>

<svelte:head>
	<title>Tech Screening App</title>
</svelte:head>

<aside class="flex h-screen w-64 flex-col bg-white p-4">
	<Sidebar />
</aside>

<main class="h-screen flex-1 overflow-y-scroll p-4">
	{@render children_render?.()}
</main>
