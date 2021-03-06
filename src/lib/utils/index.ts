import type { AnswerKey } from '$lib/store/quiz';

/**
 * Replace url query params without page reloads or navigations
 *
 * https://dev.to/mohamadharith/mutating-query-params-in-sveltekit-without-page-reloads-or-navigations-2i2b
 */
export const replaceStateWithQuery = (values: Record<string, string>): void => {
	const url = new URL(window.location.toString());

	for (const [k, v] of Object.entries(values)) {
		if (v) {
			url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
		} else {
			url.searchParams.delete(k);
		}
	}

	history.replaceState({}, '', url);
};

/**
 * Calculate quiz question score given a specified grade
 */
export function deriveScoreFromAnswer(answerKey: AnswerKey): number {
	switch (answerKey) {
		case 'A':
			return 10;
		case 'B':
			return 8;
		case 'C':
			return 7;
		case 'D':
			return 6;
		case 'F':
		default:
			return 0;
	}
}
