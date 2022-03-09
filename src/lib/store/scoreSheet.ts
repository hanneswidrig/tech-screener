import { writable, derived } from 'svelte/store';

import type { AnswerKey } from '$lib/Question.type';

function deriveScoreFromAnswer(answerKey: AnswerKey): number {
	switch (answerKey) {
		case 'A':
			return 10;
		case 'B':
			return 8;
		case 'C':
			return 7;
		case 'D':
			return 6;
		case 'F':
		default:
			return 0;
	}
}

function createScoreSheet() {
	const { subscribe, set, update } = writable({ score: 0, maxScore: 0, answerCount: 0 });

	return {
		subscribe,
		add: (answerKey: AnswerKey) => {
			update((prev) => {
				const nextScore = prev.score + deriveScoreFromAnswer(answerKey);
				const nextAnswerCount = prev.answerCount + 1;

				return {
					score: nextScore,
					maxScore: nextAnswerCount * deriveScoreFromAnswer('A'),
					answerCount: nextAnswerCount,
				};
			});
		},
		remove: (answerKey: AnswerKey) => {
			update((prev) => {
				const nextScore = prev.score - deriveScoreFromAnswer(answerKey);
				const nextAnswerCount = prev.answerCount - 1;

				return {
					score: nextScore,
					maxScore: nextAnswerCount * deriveScoreFromAnswer('A'),
					answerCount: nextAnswerCount,
				};
			});
		},
		clear: () => set({ score: 0, maxScore: 0, answerCount: 0 }),
	};
}

export const scoreSheet = createScoreSheet();

export const scoreSheetPercentGrade = derived(scoreSheet, ($scoreSheet) => {
	const rawPercentage = $scoreSheet.score / Math.max($scoreSheet.maxScore, 1);
	return Math.round(rawPercentage * 100);
});
