import { writable } from 'svelte/store';

export type AnswerKey = 'A' | 'B' | 'C' | 'D' | 'F' | '';
export type QuizAnswer = { topicId: string; questionId: string; grade: AnswerKey };

function createQuiz() {
    const { subscribe, set, update } = writable<QuizAnswer[]>([]);

    return {
        subscribe,
        add: (answer: QuizAnswer) => update((prevAnswers) => [...prevAnswers, answer]),
        update: (answer: QuizAnswer) => {
            update((prevAnswers) =>
                prevAnswers.map((v) =>
                    v.questionId === answer.questionId
                        ? { topicId: v.topicId, questionId: v.questionId, grade: answer.grade }
                        : v
                )
            );
        },
        remove: (answer: QuizAnswer) => {
            update((prevAnswers) => prevAnswers.filter((prevAnswer) => prevAnswer.questionId !== answer.questionId));
        },
        resetTopic: (topicId: string) => {
            update((prevAnswers) => prevAnswers.filter((prevAnswer) => prevAnswer.topicId !== topicId));
        },
        clear: () => set([]),
    };
}

export const quiz = createQuiz();
