<script lang="ts">
	import type { Question, AnswerKey } from 'src/types/Question.type';

	export let q: Question = {
		question: 'What is an Object?',
		answer: 'An instance of a class.',
		selected: '',
	};

	function onAnswerSelected(selected: AnswerKey): void {
		if (q.selected === selected) {
			q.selected = '';
		} else {
			q.selected = selected;
		}
	}
</script>

<div class="w-full flex justify-between items-center">
	<h2>{q.question}</h2>
	<div class="inline-flex space-x-1">
		<button class="box" class:selected={q.selected === 'A'} on:click={() => onAnswerSelected('A')}>A</button>
		<button class="box" class:selected={q.selected === 'B'} on:click={() => onAnswerSelected('B')}>B</button>
		<button class="box" class:selected={q.selected === 'C'} on:click={() => onAnswerSelected('C')}>C</button>
		<button class="box" class:selected={q.selected === 'D'} on:click={() => onAnswerSelected('D')}>D</button>
		<button class="box" class:selected={q.selected === 'F'} on:click={() => onAnswerSelected('F')}>F</button>
	</div>
</div>

<style>
	.box {
		@apply px-3.5 py-2 shadow-sm hover:shadow-md border border-blue-300 hover:border-blue-600;
	}

	.box:first-of-type {
		@apply rounded-tl-md rounded-bl-md;
	}

	.box:last-of-type {
		@apply rounded-tr-md rounded-br-md;
	}

	.box:not(.selected) {
		@apply text-black bg-white;
	}

	.box.selected {
		@apply text-white bg-blue-700 hover:bg-blue-800 border border-blue-900;
	}
</style>
