import { v4 as uuidv4 } from 'uuid';
import { derived, writable } from 'svelte/store';

import { activeTopic } from '$lib/store/active-topic';
import { questionBank, type QuestionBank } from '$lib/data/question-bank';

export type QuizQuestion = { topicId: string; id: string; question: string; answer: string; expanded: boolean };

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
