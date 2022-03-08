<script lang="ts">
	import { page } from '$app/stores';
	const selectedCategories = $page.url.searchParams.getAll('category');
	console.log(selectedCategories);
</script>
