<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<title>Tech Screening App</title>
</svelte:head>

<Header />

<main class="max-w-5xl mx-auto my-4">
	<slot />
</main>

<footer />
