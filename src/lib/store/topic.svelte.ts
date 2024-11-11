import { goto } from "$app/navigation";

class Topic {
	all = $state<string[]>([]);
	active = $state("");

	isActive(topic: string): boolean {
		return this.active === topic;
	}

	setActive(topic: string | null) {
		this.active = topic ?? this.all.at(0) ?? "";
		replaceStateWithQuery({ selected: this.active });
	}
}

function replaceStateWithQuery(values: Record<string, string | undefined>): void {
	const url = new URL(location.toString());

	for (const [key, value] of Object.entries(values)) {
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
	}

	goto(url, { replaceState: true });
}

export const topic = new Topic();
