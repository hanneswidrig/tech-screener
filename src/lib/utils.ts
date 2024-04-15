import { goto } from "$app/navigation";
import type { AnswerKey } from "$lib/store/quiz";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Replace url query params without page reloads or navigations
 *
 * https://dev.to/mohamadharith/mutating-query-params-in-sveltekit-without-page-reloads-or-navigations-2i2b
 */
export const replaceStateWithQuery = (values: Record<string, string | undefined>): void => {
	const url = new URL(window.location.toString());

	for (const [key, value] of Object.entries(values)) {
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
	}

	goto(url, { replaceState: true });
};

/**
 * Calculate quiz question score given a specified grade
 */
export function deriveScoreFromAnswer(answerKey: AnswerKey): number {
	switch (answerKey) {
		case "A":
			return 10;
		case "B":
			return 8;
		case "C":
			return 7;
		case "D":
			return 6;
		case "F":
		default:
			return 0;
	}
}
