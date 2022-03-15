<script lang="ts">
	import type { QuizQuestion, AnswerKey } from '$lib/Question.type';
	import { quiz } from '$lib/store/quiz';

	export let question: QuizQuestion;

	function onAnswerSelected(selected: AnswerKey): void {
		const deselect = question.selected === selected;
		const changeSelect = question.selected !== '' && question.selected !== selected;
		const select = question.selected === '' && question.selected !== selected;

		if (deselect) {
			quiz.remove({ topicId: 'csharp', questionId: question.id, grade: selected });
			question.selected = '';
		}

		if (changeSelect) {
			quiz.update({ topicId: 'csharp', questionId: question.id, grade: selected });
			question.selected = selected;
		}

		if (select) {
			quiz.add({ topicId: 'csharp', questionId: question.id, grade: selected });
			question.selected = selected;
		}
	}
</script>

<div class="w-full flex flex-col">
	<div class="w-full flex justify-between items-center mb-3">
		<h2 class="font-bold text-xl">{question.question} - {question.id}</h2>
		<div class="inline-flex ml-4 space-x-1">
			<button class="box" class:selected={question.selected === 'A'} on:click={() => onAnswerSelected('A')}>A</button>
			<button class="box" class:selected={question.selected === 'B'} on:click={() => onAnswerSelected('B')}>B</button>
			<button class="box" class:selected={question.selected === 'C'} on:click={() => onAnswerSelected('C')}>C</button>
			<button class="box" class:selected={question.selected === 'D'} on:click={() => onAnswerSelected('D')}>D</button>
			<button class="box" class:selected={question.selected === 'F'} on:click={() => onAnswerSelected('F')}>F</button>
		</div>
	</div>
	<div class="w-full">{question.answer}</div>
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
