import { topic } from "$lib/store/topic.svelte";
import { calculateScore } from "$lib/utils";

export type Grade = "A" | "B" | "C" | "D" | "F" | "";
export type QuizAnswer = { topicId: string; questionId: string; grade: Grade };

class Quiz {
	answers = $state<QuizAnswer[]>([]);

	totalScore = $derived.by(() => {
		if (quiz.answers.length > 0) {
			const scores = quiz.answers.map(({ grade }) => calculateScore(grade));
			const currentScore = scores.reduce((prev, curr) => prev + curr, 0);
			const maxScore = quiz.answers.length * calculateScore("A");
			const percentage = Math.round((currentScore / maxScore) * 100);
			return percentage;
		}

		return -1;
	});

	add(answer: QuizAnswer): void {
		this.answers.push(answer);
	}

	update({ questionId, grade }: QuizAnswer): void {
		for (const answer of this.answers.filter((answer) => answer.questionId === questionId)) {
			answer.grade = grade;
		}
	}

	remove(answer: QuizAnswer): void {
		this.answers = this.answers.filter(
			(prevAnswer) => prevAnswer.questionId !== answer.questionId,
		);
	}

	clearActiveTopic(): void {
		this.answers = this.answers.filter((prevAnswer) => prevAnswer.topicId !== topic.active);
	}

	clear(): void {
		this.answers = [];
	}
}

export const quiz = new Quiz();
