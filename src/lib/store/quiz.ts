import { v4 as uuidv4 } from 'uuid';
import { writable, derived } from 'svelte/store';

import { replaceStateWithQuery } from '$lib/utils';
import type { AnswerKey } from '$lib/Question.type';
import type { QuizQuestion } from '$lib/Question.type';
import { questionBank, type QuestionBank } from '$lib/data/question-bank';

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

function mapToQuizQuestions(questions: QuestionBank[], topicId: string): QuizQuestion[] {
	return questions.map(({ question, answer }) => ({ topicId, id: uuidv4(), question, answer, expanded: false }));
}

function createQuestions() {
	const { subscribe, set, update } = writable<QuizQuestion[]>([]);

	const { csharp } = questionBank();
	set(mapToQuizQuestions(csharp, 'csharp'));

	return {
		subscribe,
		expandAll: (activeTopic: string) => {
			update((questions) =>
				questions.map((question) => {
					return activeTopic === question.topicId ? { ...question, expanded: true } : question;
				})
			);
		},
		collapseAll: (activeTopic: string) => {
			update((questions) =>
				questions.map((question) => {
					return activeTopic === question.topicId ? { ...question, expanded: false } : question;
				})
			);
		},
	};
}

export const questions = createQuestions();

export const readOnlyQuestions = derived([questions, activeTopic], ([$questions, $activeTopic]) => {
	if ($activeTopic === 'csharp') {
		return $questions.filter(({ topicId }) => topicId === $activeTopic);
	}

	return [];
});
