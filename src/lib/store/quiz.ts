import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';

import { replaceStateWithQuery } from '$lib/utils';
import type { AnswerKey } from '$lib/Question.type';
import { questionBank } from '$lib/data/question-bank';
import type { QuizQuestion } from '$lib/Question.type';

export const activeTopics = writable<string[]>([]);

function createActiveTopic() {
	const { subscribe, set } = writable('');
	return {
		subscribe,
		update: (topic: string) => {
			set(topic);
			replaceStateWithQuery({ selected: topic });
		},
	};
}

export const activeTopic = createActiveTopic();

type QuestionResult = { topicId: string; questionId: string; grade: AnswerKey };

function createQuiz() {
	const { subscribe, set, update } = writable<QuestionResult[]>([]);

	return {
		subscribe,
		add: (result: QuestionResult) => update((prev) => [...prev, result]),
		update: (result: QuestionResult) => {
			update((prev) =>
				prev.map((v) =>
					v.questionId === result.questionId ? { topicId: v.topicId, questionId: v.questionId, grade: result.grade } : v
				)
			);
		},
		remove: (result: QuestionResult) => {
			update((prev) => prev.filter((v) => v.questionId !== result.questionId));
		},
		resetTopic: (topic: string) => {
			update((prev) => prev.filter((v) => v.topicId !== topic));
		},
		clear: () => set([]),
	};
}

export const quiz = createQuiz();

export const questions = writable<QuizQuestion[]>(
	questionBank().csharp.map(({ question, answer }) => ({
		id: uuidv4(),
		question,
		answer,
		expanded: false,
	}))
);
