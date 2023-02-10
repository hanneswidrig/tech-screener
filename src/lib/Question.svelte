<script lang="ts">
	import MdiChevronDown from "~icons/mdi/chevron-down";

	import { quiz, type AnswerKey } from "$lib/store/quiz";
	import type { QuizQuestion } from "$lib/store/questions";
	import { cs } from "./utils";

	export let question: QuizQuestion;
	export let expanded = false;

	$: selected = $quiz.find(({ questionId }) => questionId === question.id)?.grade ?? "";

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
	on:click={() => (expanded = !expanded)}
	on:keydown={({ key }) => key === ("e" || "E") && (expanded = !expanded)}>
	<div class="flex w-full items-center justify-between p-4">
		<div class="flex items-center">
			<MdiChevronDown class="mr-4 text-lg" transform="rotate({expanded ? 180 : 0})" />
			<h2 class="text-lg font-bold">{question.question}</h2>
		</div>
		<div class="ml-4 inline-flex space-x-1">
			<button
				class={cs(
					`rounded-tl-md rounded-bl-md`,
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "A"}
				on:click|stopPropagation={() => onAnswerSelected("A")}>
				A
			</button>
			<button
				class={cs(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "B"}
				on:click|stopPropagation={() => onAnswerSelected("B")}>
				B
			</button>
			<button
				class={cs(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "C"}
				on:click|stopPropagation={() => onAnswerSelected("C")}>
				C
			</button>
			<button
				class={cs(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "D"}
				on:click|stopPropagation={() => onAnswerSelected("D")}>
				D
			</button>
			<button
				class={cs(
					`rounded-tr-md rounded-br-md`,
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selected === "F"}
				on:click|stopPropagation={() => onAnswerSelected("F")}>
				F
			</button>
		</div>
	</div>
	{#if expanded}
		<div class="w-full p-4">{question.answer}</div>
	{/if}
</div>
