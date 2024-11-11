import { questionBank, type QuestionBank } from "$lib/data/question-bank";
import { topic } from "$lib/store/topic.svelte";

export type QuizQuestion = {
	topicId: string;
	id: string;
	question: string;
	answer: string;
	expanded: boolean;
};

function mapToQuizQuestions(topicId: string, questions: QuestionBank[]): QuizQuestion[] {
	return questions.map(({ question, answer }) => ({
		topicId,
		id: crypto.randomUUID(),
		question,
		answer,
		expanded: false,
	}));
}

class Questions {
	all = $state<QuizQuestion[]>([]);
	active = $derived(this.all.filter(({ topicId }) => topicId === topic.active));

	constructor() {
		for (const [topicKey, questions] of Object.entries(questionBank())) {
			this.all.push(...mapToQuizQuestions(topicKey, questions));
		}
	}

	expandAll(): void {
		for (const question of this.all.filter((q) => q.topicId === topic.active)) {
			question.expanded = true;
		}
	}

	collapseAll(): void {
		for (const question of this.all.filter((q) => q.topicId === topic.active)) {
			question.expanded = false;
		}
	}
}

export const questions = new Questions();
