<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import MdiChevronDown from "~icons/mdi/chevron-down";
	import { twMerge } from "tailwind-merge";

	import { quiz, type AnswerKey } from "$lib/store/quiz";
	import type { QuizQuestion } from "$lib/store/questions";

	interface Props {
		question: QuizQuestion;
		expanded?: boolean;
	}

	let { question, expanded = $bindable(false) }: Props = $props();

	let selected = $derived($quiz.find(({ questionId }) => questionId === question.id)?.grade ?? "");

	function onAnswerSelected(answer: AnswerKey): void {
		const topicId = question.topicId;
		const questionId = question.id;

		const deselect = selected === answer;
		const changeSelect = selected !== "" && selected !== answer;
		const select = selected === "" && selected !== answer;

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

<div
	class="flex cursor-pointer flex-col rounded-md border border-zinc-300 bg-white shadow-sm hover:border-zinc-600 hover:shadow-md"
	role="button"
	tabindex="0"
	onclick={() => (expanded = !expanded)}
	onkeydown={({ key }) => (key === "e" || key === "E") && (expanded = !expanded)}>
	<div class="flex w-full items-center justify-between p-4">
		<div class="flex items-center">
			<MdiChevronDown class="mr-4 text-lg" transform="rotate({expanded ? 180 : 0})" />
			<h2 class="text-lg font-bold">{question.question}</h2>
		</div>
		<div class="ml-4 inline-flex space-x-1">
			<button
				type="button"
				class={twMerge(
					`rounded-bl-md rounded-tl-md`,
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "A"}
				onclick={stopPropagation(() => onAnswerSelected("A"))}>
				A
			</button>
			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "B"}
				onclick={stopPropagation(() => onAnswerSelected("B"))}>
				B
			</button>
			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "C"}
				onclick={stopPropagation(() => onAnswerSelected("C"))}>
				C
			</button>
			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "D"}
				onclick={stopPropagation(() => onAnswerSelected("D"))}>
				D
			</button>
			<button
				type="button"
				class={twMerge(
					`rounded-br-md rounded-tr-md`,
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "F"}
				onclick={stopPropagation(() => onAnswerSelected("F"))}>
				F
			</button>
		</div>
	</div>
	{#if expanded}
		<div class="w-full p-4">{question.answer}</div>
	{/if}
</div>
