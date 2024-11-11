<script lang="ts">
	import MdiChevronDown from "~icons/mdi/chevron-down";
	import { twMerge } from "tailwind-merge";

	import { quiz, type Grade } from "$lib/store/quiz.svelte";
	import type { QuizQuestion } from "$lib/store/questions.svelte";

	interface Props {
		question: QuizQuestion;
		expanded?: boolean;
	}

	let { question, expanded = $bindable(false) }: Props = $props();

	let selectedGrade = $derived(
		quiz.answers.find(({ questionId }) => questionId === question.id)?.grade ?? "",
	);

	function onSelectAnswer(e: Event, grade: Grade): void {
		e.stopPropagation();

		const topicId = question.topicId;
		const questionId = question.id;

		const deselect = selectedGrade === grade;
		const changeSelect = selectedGrade !== "" && selectedGrade !== grade;
		const select = selectedGrade === "" && selectedGrade !== grade;

		if (deselect) {
			quiz.remove({ topicId, questionId, grade });
		}

		if (changeSelect) {
			quiz.update({ topicId, questionId, grade });
		}

		if (select) {
			quiz.add({ topicId, questionId, grade });
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
				class:selected={selectedGrade === "A"}
				onclick={(e) => onSelectAnswer(e, "A")}>
				A
			</button>

			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selectedGrade === "B"}
				onclick={(e) => onSelectAnswer(e, "B")}>
				B
			</button>

			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selectedGrade === "C"}
				onclick={(e) => onSelectAnswer(e, "C")}>
				C
			</button>

			<button
				type="button"
				class={twMerge(
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selectedGrade === "D"}
				onclick={(e) => onSelectAnswer(e, "D")}>
				D
			</button>

			<button
				type="button"
				class={twMerge(
					`rounded-br-md rounded-tr-md`,
					`border border-blue-300 bg-white px-3.5 py-2 text-black shadow-sm hover:border-blue-600 hover:shadow-md`,
					`[&.selected]:border-blue-900 [&.selected]:bg-blue-700 [&.selected]:text-white [&.selected]:hover:bg-blue-800`,
				)}
				class:selected={selectedGrade === "F"}
				onclick={(e) => onSelectAnswer(e, "F")}>
				F
			</button>
		</div>
	</div>

	{#if expanded}
		<div class="w-full p-4">{question.answer}</div>
	{/if}
</div>
