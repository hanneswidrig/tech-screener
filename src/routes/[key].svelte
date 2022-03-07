<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load<{ key: string }> = async ({ params }) => ({ props: params });
</script>

<script lang="ts">
	export let key: string = '';
</script>

<span>{key}</span>
