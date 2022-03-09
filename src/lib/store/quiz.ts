import { writable } from 'svelte/store';

import type { AnswerKey } from '$lib/Question.type';

type QuestionResult = { topicId: string; questionId: string; grade: AnswerKey };

export const activeTopics = writable<string[]>([]);
export const activeTopic = writable('');

function createQuiz() {
	const { subscribe, set, update } = writable<QuestionResult[]>([]);

	return {
		subscribe,
		add: (result: QuestionResult) => update((prev) => [...prev, result]),
		update: (result: QuestionResult) => {
			update((prev) => {
				return prev.map((v) => {
					const matchResult = v.topicId === result.topicId && v.questionId === result.questionId;
					return matchResult ? { topicId: v.topicId, questionId: v.questionId, grade: result.grade } : v;
				});
			});
		},
		remove: (result: QuestionResult) => {
			update((prev) => {
				return prev.filter((v) => !(v.topicId === result.topicId && v.questionId == result.questionId));
			});
		},
		clear: () => set([]),
	};
}

export const quiz = createQuiz();
