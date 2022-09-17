import { v4 as uuidv4 } from 'uuid';
import { derived, writable } from 'svelte/store';

import { activeTopic } from '$lib/store/active-topic';
import { questionBank, type QuestionBank } from '$lib/data/question-bank';

export type QuizQuestion = { topicId: string; id: string; question: string; answer: string; expanded: boolean };

function mapToQuizQuestions(questions: QuestionBank[], topicId: string): QuizQuestion[] {
    return questions.map(({ question, answer }) => ({ topicId, id: uuidv4(), question, answer, expanded: false }));
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
                q.map((question) => (activeTopic === question.topicId ? { ...question, expanded: true } : question))
            );
        },
        collapseAll: (activeTopic: string) => {
            update((q) =>
                q.map((question) => (activeTopic === question.topicId ? { ...question, expanded: false } : question))
            );
        },
    };
}

export const questions = createQuestions();

export const readOnlyQuestions = derived([questions, activeTopic], ([$questions, $activeTopic]) => {
    return $questions.filter(({ topicId }) => topicId === $activeTopic);
});
