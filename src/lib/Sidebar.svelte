<script lang="ts">
	import { page } from "$app/state";
	import { goto } from "$app/navigation";

	import { quiz } from "$lib/store/quiz.svelte";
	import Button from "$lib/Button.svelte";
	import ScoreSummary from "$lib/ScoreSummary.svelte";
	import TopicSwitcher from "$lib/TopicSwitcher.svelte";

	let pathname = $derived(page.url.pathname);

	async function goToDashboard(): Promise<void> {
		quiz.clear();

		if (pathname !== "/") {
			return goto("/");
		}
	}
</script>

<div class="flex h-full flex-col justify-between">
	<div class="flex flex-col">
		<Button selected={pathname === "/"} onClick={() => goToDashboard()}>Dashboard</Button>

		<div class="mt-4 h-px w-full bg-zinc-300"></div>

		{#if pathname.includes("/quiz")}
			<TopicSwitcher />
		{/if}
	</div>

	{#if pathname.includes("/quiz")}
		<ScoreSummary />
	{/if}
</div>
