<script lang="ts">
	import type { QuizQuestion, AnswerKey } from '$lib/types/Question.type';
	import { scoreSheet } from '$lib/store/scoreSheet';

	export let state: QuizQuestion;

	function onAnswerSelected(selected: AnswerKey): void {
		const deselect = state.selected === selected;
		const changeSelect = state.selected !== '' && state.selected !== selected;
		const select = state.selected === '' && state.selected !== selected;

		if (deselect) {
			scoreSheet.remove(selected);
			state.selected = '';
		}

		if (changeSelect) {
			scoreSheet.remove(state.selected);
			scoreSheet.add(selected);
			state.selected = selected;
		}

		if (select) {
			scoreSheet.add(selected);
			state.selected = selected;
		}
	}
</script>

<div class="w-full flex flex-col">
	<div class="w-full flex justify-between items-center mb-3">
		<h2 class="font-bold text-xl">{state.question}</h2>
		<div class="inline-flex ml-4 space-x-1">
			<button class="box" class:selected={state.selected === 'A'} on:click={() => onAnswerSelected('A')}>A</button>
			<button class="box" class:selected={state.selected === 'B'} on:click={() => onAnswerSelected('B')}>B</button>
			<button class="box" class:selected={state.selected === 'C'} on:click={() => onAnswerSelected('C')}>C</button>
			<button class="box" class:selected={state.selected === 'D'} on:click={() => onAnswerSelected('D')}>D</button>
			<button class="box" class:selected={state.selected === 'F'} on:click={() => onAnswerSelected('F')}>F</button>
		</div>
	</div>
	<div class="w-full">{state.answer}</div>
</div>

<style>
	.box {
		@apply px-3.5 py-2 shadow-sm hover:shadow-md border;
	}

	.box:first-of-type {
		@apply rounded-tl-md rounded-bl-md;
	}

	.box:last-of-type {
		@apply rounded-tr-md rounded-br-md;
	}

	.box:not(.selected) {
		@apply text-black bg-white border-blue-300 hover:border-blue-600;
	}

	.box.selected {
		@apply text-white bg-blue-700 hover:bg-blue-800 border-blue-900;
	}
</style>
