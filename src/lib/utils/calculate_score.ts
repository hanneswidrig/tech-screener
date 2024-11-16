import type { Grade } from "$lib/store/quiz.svelte";

export function calculateScore(grade: Grade): number {
	switch (grade) {
		case "A":
			return 10;
		case "B":
			return 8;
		case "C":
			return 7;
		case "D":
			return 6;
		case "F":
		default:
			return 0;
	}
}
