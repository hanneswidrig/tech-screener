import { writable } from "svelte/store";

import { questionBank, type QuestionBank } from "$lib/data/question-bank";

export type QuizQuestion = {
	topicId: string;
	id: string;
	question: string;
	answer: string;
	expanded: boolean;
};

function mapToQuizQuestions(questions: QuestionBank[], topicId: string): QuizQuestion[] {
	return questions.map(({ question, answer }) => ({
		topicId,
		id: crypto.randomUUID(),
		question,
		answer,
		expanded: false,
	}));
}

function createQuestions() {
	const { subscribe, update } = writable<QuizQuestion[]>([]);

	for (const [topicKey, questions] of Object.entries(questionBank())) {
		update((q) => q.concat(mapToQuizQuestions(questions, topicKey)));
	}

	return {
		subscribe,
		expandAll: (activeTopic: string) => {
			update((q) =>
				q.map((question) =>
					activeTopic === question.topicId ? { ...question, expanded: true } : question,
				),
			);
		},
		collapseAll: (activeTopic: string) => {
			update((q) =>
				q.map((question) =>
					activeTopic === question.topicId ? { ...question, expanded: false } : question,
				),
			);
		},
	};
}

export const questions = createQuestions();
