<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	import { quiz } from "$lib/store/quiz";
	import Button from "$lib/Button.svelte";
	import ScoreSummary from "$lib/ScoreSummary.svelte";
	import TopicSwitcher from "$lib/TopicSwitcher.svelte";

	async function goToDashboard(): Promise<void> {
		quiz.clear();

		if ($page.url.pathname !== "/") {
			return goto("/");
		}
	}
</script>

<div class="flex h-full flex-col justify-between">
	<div class="flex flex-col">
		<Button active={$page.url.pathname === "/"} onClick={() => goToDashboard()}
			>Dashboard</Button>

		<div class="mt-4 h-px w-full bg-zinc-300"></div>

		{#if $page.url.pathname.includes("/quiz")}
			<TopicSwitcher />
		{/if}
	</div>

	{#if $page.url.pathname.includes("/quiz")}
		<ScoreSummary />
	{/if}
</div>
