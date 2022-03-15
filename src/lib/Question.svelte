<script lang="ts">
	import MdiChevronDown from 'virtual:icons/mdi/chevron-down';

	import { quiz } from '$lib/store/quiz';
	import type { QuizQuestion, AnswerKey } from '$lib/Question.type';

	export let question: QuizQuestion;
	export let expanded = false;

	$: selected = $quiz.find(({ questionId }) => questionId === question.id)?.grade ?? '';

	function onAnswerSelected(answer: AnswerKey): void {
		const topicId = question.topicId;
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

<div class="card" on:click={() => (expanded = !expanded)}>
	<div class="w-full p-4 flex justify-between items-center">
		<div class="flex items-center">
			<MdiChevronDown class="text-lg mr-4" transform="rotate({expanded ? 180 : 0})" />
			<h2 class="font-bold text-lg">{question.question}</h2>
		</div>
		<div class="inline-flex ml-4 space-x-1">
			<button class="option" class:selected={selected === 'A'} on:click|stopPropagation={() => onAnswerSelected('A')}>
				A
			</button>
			<button class="option" class:selected={selected === 'B'} on:click|stopPropagation={() => onAnswerSelected('B')}>
				B
			</button>
			<button class="option" class:selected={selected === 'C'} on:click|stopPropagation={() => onAnswerSelected('C')}>
				C
			</button>
			<button class="option" class:selected={selected === 'D'} on:click|stopPropagation={() => onAnswerSelected('D')}>
				D
			</button>
			<button class="option" class:selected={selected === 'F'} on:click|stopPropagation={() => onAnswerSelected('F')}>
				F
			</button>
		</div>
	</div>
	{#if expanded}
		<div class="w-full p-4">{question.answer}</div>
	{/if}
</div>

<style>
	.card {
		@apply flex flex-col bg-white shadow-sm hover:shadow-md rounded-md border border-zinc-300 hover:border-zinc-600 cursor-pointer;
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
