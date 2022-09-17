import { writable } from 'svelte/store';

import { replaceStateWithQuery } from '$lib/utils';

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
