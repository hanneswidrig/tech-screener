<script lang="ts">
	import { activeTopic, quiz } from '$lib/store/quiz';
	import type { QuizQuestion, AnswerKey } from '$lib/Question.type';

	export let question: QuizQuestion;

	$: selected = $quiz.find(({ questionId }) => questionId === question.id)?.grade ?? '';

	function onAnswerSelected(answer: AnswerKey): void {
		const topicId = $activeTopic;
		const questionId = question.id;

		const deselect = selected === answer;
		const changeSelect = selected !== '' && selected !== answer;
		const select = selected === '' && selected !== answer;

		if (deselect) {
			quiz.remove({ topicId, questionId, grade: answer });
		}

		if (changeSelect) {
			quiz.update({ topicId, questionId, grade: answer });
		}

		if (select) {
			quiz.add({ topicId, questionId, grade: answer });
		}
	}
</script>

<div class="card">
	<div class="w-full flex flex-col">
		<div class="w-full flex justify-between items-center mb-3">
			<h2 class="font-bold text-xl">{question.question}</h2>
			<div class="inline-flex ml-4 space-x-1">
				<button class="option" class:selected={selected === 'A'} on:click={() => onAnswerSelected('A')}>A</button>
				<button class="option" class:selected={selected === 'B'} on:click={() => onAnswerSelected('B')}>B</button>
				<button class="option" class:selected={selected === 'C'} on:click={() => onAnswerSelected('C')}>C</button>
				<button class="option" class:selected={selected === 'D'} on:click={() => onAnswerSelected('D')}>D</button>
				<button class="option" class:selected={selected === 'F'} on:click={() => onAnswerSelected('F')}>F</button>
			</div>
		</div>
		<div class="w-full">{question.answer}</div>
	</div>
</div>

<style>
	.card {
		@apply flex flex-col p-4 bg-white shadow-sm rounded-md border border-gray-300;
	}

	.option {
		@apply px-3.5 py-2 shadow-sm hover:shadow-md border;
	}

	.option:first-of-type {
		@apply rounded-tl-md rounded-bl-md;
	}

	.option:last-of-type {
		@apply rounded-tr-md rounded-br-md;
	}

	.option:not(.selected) {
		@apply text-black bg-white border-blue-300 hover:border-blue-600;
	}

	.option.selected {
		@apply text-white bg-blue-700 hover:bg-blue-800 border-blue-900;
	}
</style>
