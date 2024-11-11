import type { AnswerKey } from "$lib/store/quiz";

export function calculateScore(answerKey: AnswerKey): number {
	switch (answerKey) {
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
