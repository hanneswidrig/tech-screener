<script lang="ts">
	import MdiChevronDown from "~icons/mdi/chevron-down";

	import { quiz, type Grade, type QuizAnswer } from "$lib/store/quiz.svelte";
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

		const answer: QuizAnswer = { topicId: question.topicId, questionId: question.id, grade };

		const deselect = selectedGrade === grade;
		const changeSelect = selectedGrade !== "" && selectedGrade !== grade;
		const select = selectedGrade === "" && selectedGrade !== grade;

		if (deselect) {
			quiz.remove(answer);
		}

		if (changeSelect) {
			quiz.update(answer);
		}

		if (select) {
			quiz.add(answer);
		}
	}

	const baseStyles =
		"border border-blue-300 bg-white px-3.5 py-2 text-black shadow-xs hover:border-blue-600 hover:shadow-md";

	const selectedStyles = "border-blue-900 bg-blue-700 text-white hover:bg-blue-800";
</script>

<div
	class="flex cursor-pointer flex-col rounded-md border border-zinc-300 bg-white shadow-xs hover:border-zinc-600 hover:shadow-md"
	role="button"
	tabindex="0"
	onclick={() => (expanded = !expanded)}
	onkeydown={({ key }) => (key === "e" || key === "E") && (expanded = !expanded)}>
	<div class="flex w-full items-center justify-between p-4">
		<div class="flex items-center">
			<MdiChevronDown class="mr-4 text-lg" transform="rotate({expanded ? 180 : 0})" />
			<h2 class="text-lg font-bold">{question.prompt}</h2>
		</div>

		<div class="ml-4 inline-flex space-x-1">
			<button
				type="button"
				class={[
					baseStyles,
					"rounded-tl-md rounded-bl-md",
					selectedGrade === "A" && selectedStyles,
				]}
				onclick={(e) => onSelectAnswer(e, "A")}>
				A
			</button>

			<button
				type="button"
				class={[baseStyles, selectedGrade === "B" && selectedStyles]}
				onclick={(e) => onSelectAnswer(e, "B")}>
				B
			</button>

			<button
				type="button"
				class={[baseStyles, selectedGrade === "C" && selectedStyles]}
				onclick={(e) => onSelectAnswer(e, "C")}>
				C
			</button>

			<button
				type="button"
				class={[baseStyles, selectedGrade === "D" && selectedStyles]}
				onclick={(e) => onSelectAnswer(e, "D")}>
				D
			</button>

			<button
				type="button"
				class={[
					baseStyles,
					"rounded-tr-md rounded-br-md",
					selectedGrade === "F" && selectedStyles,
				]}
				onclick={(e) => onSelectAnswer(e, "F")}>
				F
			</button>
		</div>
	</div>

	{#if expanded}
		<div class="w-full p-4">{question.answer}</div>
	{/if}
</div>
