import { writable, derived } from 'svelte/store';

import { replaceStateWithQuery } from '$lib/utils';
import { questionBank } from '$lib/data/question-bank';
import type { AnswerKey, QuizQuestion } from '$lib/Question.type';

type QuestionResult = { topicId: string; questionId: string; grade: AnswerKey };

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

export const activeTopicQuestions = derived(activeTopic, ($activeTopic) => {
	if ($activeTopic === 'csharp') {
		return questionBank().csharp.map(
			({ question, answer }, i): QuizQuestion => ({ id: `${i}`, question, answer, selected: '' })
		);
	}

	return [];
});

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
